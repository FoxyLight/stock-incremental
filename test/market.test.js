import test from 'node:test';
import assert from 'node:assert/strict';
import {
  COMPANIES, nextRandom, initialEconomy, transitionEconomicState, dailyNoise,
  productReception, fundamentalChange, referencePrice, expectedProfit,
  ordinaryPrice, earningsPrice, informationAtDay, createSession, resetSession, advanceDay,
} from '../src/market.js';

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-10,
  `Expected ${expected}, got ${actual}`);

test('five company definitions match the authoritative starting values', () => {
  assert.deepEqual(COMPANIES.map((c) => [c.name, c.sector, c.initial_revenue,
    c.initial_costs, c.initial_profit, c.demand_sensitivity, c.cost_sensitivity]), [
    ['Northstar Foods', 'Consumer', 100, 80, 20, 2, 2],
    ['Hearthline Retail', 'Consumer', 100, 82, 18, 4, 1],
    ['BrightFizz Drinks', 'Consumer', 100, 78, 22, 3, 4],
    ['Kestrel Systems', 'Technology', 100, 76, 24, 1, 1],
    ['Lantern Devices', 'Technology', 100, 79, 21, 3, 3],
  ]);
});

test('all seven allowed initial economy pairs have equal sampling intervals', () => {
  const pairs = Array.from({ length: 7 }, (_, i) => initialEconomy((i + 0.5) / 7));
  assert.equal(new Set(pairs.map(JSON.stringify)).size, 7);
  for (const { consumer_demand: demand, cost_pressure: costs } of pairs) {
    assert.ok([-1, 0, 1].includes(demand) && [-1, 0, 1].includes(costs));
    assert.ok(!(demand === 1 && costs === -1));
    assert.ok(!(demand === -1 && costs === 1));
  }
  assert.deepEqual(initialEconomy(0), { consumer_demand: -1, cost_pressure: -1 });
  assert.deepEqual(initialEconomy(1 - Number.EPSILON), { consumer_demand: 1, cost_pressure: 1 });
});

test('economic transitions have exact 60/20/20 intervals and bounded endpoints', () => {
  for (const state of [-1, 0, 1]) {
    for (const sample of [0, 0.599999]) assert.equal(transitionEconomicState(state, sample), state);
    for (const sample of [0.6, 0.799999]) assert.equal(transitionEconomicState(state, sample), Math.min(1, state + 1));
    for (const sample of [0.8, 0.999999]) assert.equal(transitionEconomicState(state, sample), Math.max(-1, state - 1));
  }
  assert.equal(transitionEconomicState(-1, 0.6), 0);
  assert.equal(transitionEconomicState(1, 0.8), 0);
});

test('noise uses exactly the five equally sized allowed intervals', () => {
  for (const [sample, expected] of [[0, -0.02], [0.199999, -0.02], [0.2, -0.01],
    [0.399999, -0.01], [0.4, 0], [0.599999, 0], [0.6, 0.01],
    [0.799999, 0.01], [0.8, 0.02], [0.999999, 0.02]]) {
    assert.equal(dailyNoise(sample), expected);
  }
});

test('Lantern outcomes are the three explicitly chosen equal intervals', () => {
  assert.equal(productReception(0), 'weak');
  assert.equal(productReception(1 / 3 - 1e-10), 'weak');
  assert.equal(productReception(1 / 3), 'neutral');
  assert.equal(productReception(2 / 3 - 1e-10), 'neutral');
  assert.equal(productReception(2 / 3), 'strong');
  assert.equal(productReception(0.999999), 'strong');
});

test('all 20 authoritative condition-matrix values match the fundamentals', () => {
  const conditions = [[1, -1], [1, 1], [-1, -1], [-1, 1]];
  const expected = [[1, 0, 0.25, -0.75], [1.25, 0.75, -0.75, -1.25],
    [1.75, -0.25, 0.25, -1.75], [0.5, 0, 0.125, -0.375], [1.5, 0, 0, -1.5]];
  COMPANIES.forEach((company, i) => conditions.forEach(([consumer_demand, cost_pressure], j) => {
    const delta = fundamentalChange(company, { consumer_demand, cost_pressure });
    assert.equal(delta.revenue - delta.costs, expected[i][j]);
  }));
});

test('normal demand and costs give zero changes; defensive traits only halve weak demand', () => {
  for (const company of COMPANIES) {
    const normal = fundamentalChange(company, { consumer_demand: 0, cost_pressure: 0 });
    close(normal.revenue, 0);
    close(normal.costs, 0);
    assert.equal(fundamentalChange(company, { consumer_demand: 1, cost_pressure: 1 }).revenue,
      company.demand_sensitivity * 0.25);
  }
  assert.equal(fundamentalChange(COMPANIES[0], { consumer_demand: -1, cost_pressure: 0 }).revenue, -0.25);
  assert.equal(fundamentalChange(COMPANIES[3], { consumer_demand: -1, cost_pressure: 0 }).revenue, -0.125);
  assert.equal(fundamentalChange(COMPANIES[1], { consumer_demand: -1, cost_pressure: 0 }).revenue, -1);
});

test('valuation has a $5 reference floor without flooring true profit', () => {
  for (const company of COMPANIES) {
    assert.equal(referencePrice(company.initial_profit, company.initial_profit), 20);
    assert.equal(referencePrice(-100, company.initial_profit), 5);
    assert.equal(referencePrice(0, company.initial_profit), 5);
    assert.equal(referencePrice(company.initial_profit * 0.25, company.initial_profit), 5);
    assert.equal(referencePrice(company.initial_profit * 2, company.initial_profit), 40);
  }
  close(referencePrice(10, 20), 10);
});

test('expected valuation recognizes exactly half of hidden profit movement', () => {
  assert.equal(expectedProfit(30, 20), 25);
  assert.equal(expectedProfit(10, 20), 15);
  assert.equal(expectedProfit(-40, 20), -10);
  assert.equal(referencePrice(expectedProfit(-40, 20), 20), 5);
  assert.equal(referencePrice(expectedProfit(30, 20), 20), 25);
});

test('daily price converges halfway before multiplicative noise', () => {
  close(ordinaryPrice(20, 24, 0), 22);
  close(ordinaryPrice(20, 24, 0.02), 22.44);
  close(ordinaryPrice(20, 16, -0.02), 17.64);
  close(ordinaryPrice(5, 5, -0.02), 4.9);
});

test('earnings closes 75% of the true valuation gap with no added noise', () => {
  close(earningsPrice(20, 28), 26);
  close(earningsPrice(20, 12), 14);
  close(earningsPrice(20, 20), 20);
  close(earningsPrice(4.9, 5), 4.975);
});

test('initialization establishes Day 1, $100, zero holdings, original fundamentals and no prehistory', () => {
  const session = createSession(0);
  assert.equal(session.current_day, 1);
  assert.equal(session.starting_cash, 100);
  assert.equal(session.cash, 100);
  assert.equal(session.current_total_value, 100);
  assert.equal(session.session_complete, false);
  assert.deepEqual(Object.values(session.holdings_by_company), [0, 0, 0, 0, 0]);
  assert.deepEqual(session.earnings_reports, []);
  assert.deepEqual(session.lantern, { product_event_result: null, product_event_resolved: false, revenue_effect: 0 });
  session.companies.forEach((company, i) => {
    assert.equal(company.current_revenue, 100);
    assert.equal(company.current_costs, COMPANIES[i].initial_costs);
    assert.equal(company.current_profit, COMPANIES[i].initial_profit);
    assert.equal(company.last_reported_profit, company.current_profit);
    assert.equal(company.expected_profit, company.current_profit);
    assert.equal(company.current_price, 20);
    assert.equal(company.reference_price, 20);
    assert.equal(company.expected_reference_price, 20);
    assert.deepEqual(company.price_history, [{ day: 1, price: 20 }]);
  });
});

test('information flags unlock only on their scheduled days, with no late categories', () => {
  for (let day = 1; day <= 12; day++) {
    assert.deepEqual(Object.values(informationAtDay(day)), [2, 3, 4, 5, 6, 7].map((unlock) => day >= unlock));
  }
});

test('invalid seed/state and random samples fail explicitly', () => {
  for (const seed of [-1, 0.5, 2 ** 32, NaN, Infinity, '1', undefined]) {
    assert.throws(() => nextRandom(seed), RangeError);
  }
  for (const sample of [-0.001, 1, NaN, Infinity]) {
    for (const fn of [initialEconomy, dailyNoise, productReception]) assert.throws(() => fn(sample), RangeError);
    assert.throws(() => transitionEconomicState(0, sample), RangeError);
  }
  assert.throws(() => transitionEconomicState(2, 0.5), RangeError);
  assert.throws(() => referencePrice(0, 0), RangeError);
});

test('reset returns a fresh independent state for the original seed', () => {
  const state = createSession(42);
  state.cash = 0;
  state.holdings_by_company.northstar = 5;
  state.companies[0].price_history.push({ day: 2, price: 900 });
  state.lantern.product_event_resolved = true;
  assert.deepEqual(resetSession(state), createSession(42));
  assert.notEqual(resetSession(state).companies, state.companies);
});

test('full 12-day session has exact earnings, reveals, single event and terminal boundary', () => {
  let state = createSession(1);
  const seenEvents = [];
  for (let day = 2; day <= 12; day++) {
    const before = structuredClone(state);
    const next = advanceDay(state);
    assert.deepEqual(state, before, 'advance must not mutate its input');
    assert.equal(next.current_day, day);
    assert.equal(next.session_complete, day === 12);
    assert.deepEqual(next.information_visibility, informationAtDay(day));
    assert.equal(next.lantern.product_event_resolved, day >= 7);
    if (!state.lantern.product_event_resolved && next.lantern.product_event_resolved) seenEvents.push(day);
    assert.deepEqual(next.earnings_reports.map((report) => report.day), [4, 8, 12].filter((d) => d <= day));
    next.companies.forEach((company) => {
      assert.equal(company.current_profit, company.current_revenue - company.current_costs);
      assert.equal(company.price_history.length, day);
      assert.deepEqual(company.price_history.at(-1), { day, price: company.current_price });
      assert.deepEqual(company.information_visibility, next.information_visibility);
      assert.ok(Number.isFinite(company.current_price) && company.current_price > 0);
      assert.ok(company.reference_price >= 5 && company.expected_reference_price >= 5);
    });
    assert.equal(next.cash, 100);
    assert.equal(next.current_total_value, 100);
    assert.deepEqual(Object.values(next.holdings_by_company), [0, 0, 0, 0, 0]);
    state = next;
  }
  assert.deepEqual(seenEvents, [7]);
  const completed = structuredClone(state);
  assert.throws(() => advanceDay(state), /session is complete/);
  assert.deepEqual(state, completed);
});

test('earnings days skip both ordinary convergence and noise draws', () => {
  let state = createSession(123);
  for (let day = 2; day <= 12; day++) {
    const before = state;
    state = advanceDay(state);
    if (![4, 8, 12].includes(day)) continue;
    // Only two economy draws occur on an earnings day.
    const afterTwoDraws = nextRandom(nextRandom(before.random_state).state).state;
    assert.equal(state.random_state, afterTwoDraws);
    const report = state.earnings_reports.at(-1);
    state.companies.forEach((company, i) => {
      const target = 20 * Math.max(company.current_profit, COMPANIES[i].initial_profit * 0.25)
        / COMPANIES[i].initial_profit;
      close(company.current_price, before.companies[i].current_price
        + 0.75 * (target - before.companies[i].current_price));
      assert.equal(report.companies[i].price_before, before.companies[i].current_price);
      assert.deepEqual(report.companies[i].current, { revenue: company.current_revenue,
        costs: company.current_costs, profit: company.current_profit });
      assert.equal(company.last_reported_profit, company.current_profit);
      assert.equal(company.expected_profit, company.current_profit);
      assert.equal(company.expected_reference_price, company.reference_price);
    });
  }
});

test('earnings report deltas compare with initialization and then the previous report', () => {
  let state = createSession(44);
  while (!state.session_complete) state = advanceDay(state);
  state.earnings_reports.forEach((report, index) => report.companies.forEach((company, i) => {
    const prior = index === 0 ? { revenue: 100, costs: COMPANIES[i].initial_costs,
      profit: COMPANIES[i].initial_profit } : state.earnings_reports[index - 1].companies[i].current;
    assert.deepEqual(company.previous, prior);
    assert.equal(company.change.revenue, company.current.revenue - prior.revenue);
    assert.equal(company.change.costs, company.current.costs - prior.costs);
    assert.equal(company.change.profit, company.current.profit - prior.profit);
  }));
});

test('advance draws demand then costs and updates fundamentals before any pricing', () => {
  let state = createSession(2026);
  for (let day = 2; day <= 12; day++) {
    const before = state;
    const demandDraw = nextRandom(before.random_state);
    const costDraw = nextRandom(demandDraw.state);
    const transition = (value, sample) => Math.max(-1, Math.min(1,
      value + (sample < 0.6 ? 0 : sample < 0.8 ? 1 : -1)));
    const demand = transition(before.economy.consumer_demand, demandDraw.sample);
    const costs = transition(before.economy.cost_pressure, costDraw.sample);
    state = advanceDay(state);
    assert.deepEqual(state.economy, { consumer_demand: demand, cost_pressure: costs });
    state.companies.forEach((company, i) => {
      const defensive = i === 0 || i === 3;
      const demandDelta = demand * [2, 4, 3, 1, 3][i] * 0.25
        * (defensive && demand === -1 ? 0.5 : 1);
      const eventDelta = day === 7 && i === 4 ? state.lantern.revenue_effect : 0;
      close(company.current_revenue, before.companies[i].current_revenue + demandDelta + eventDelta);
      close(company.current_costs, before.companies[i].current_costs + costs * [2, 1, 4, 1, 3][i] * 0.25);
    });
  }
});

test('ordinary days use updated fundamentals, 50% expectations, convergence and noise', () => {
  let state = createSession(123);
  for (let day = 2; day <= 12; day++) {
    const before = state;
    state = advanceDay(state);
    if ([4, 8, 12].includes(day)) continue;
    // Independently derive the price target from old reported profit and new fundamentals.
    let randomState = nextRandom(nextRandom(before.random_state).state).state;
    state.companies.forEach((company, i) => {
      const delta = fundamentalChange(COMPANIES[i], state.economy);
      const preEventProfit = before.companies[i].current_profit + delta.revenue - delta.costs;
      const predicted = before.companies[i].last_reported_profit
        + 0.5 * (preEventProfit - before.companies[i].last_reported_profit);
      const target = 20 * Math.max(predicted, COMPANIES[i].initial_profit * 0.25)
        / COMPANIES[i].initial_profit;
      const random = nextRandom(randomState);
      randomState = random.state;
      const noise = [-0.02, -0.01, 0, 0.01, 0.02][Math.floor(random.sample * 5)];
      close(company.current_price, (before.companies[i].current_price
        + 0.5 * (target - before.companies[i].current_price)) * (1 + noise));
    });
    if (day === 7) randomState = nextRandom(randomState).state;
    assert.equal(state.random_state, randomState);
  }
});

test('Lantern applies one revenue effect after Day 7 pricing, persists and reaches Day 8 earnings', () => {
  const seen = new Set();
  for (let seed = 0; seed < 30; seed++) {
    let state = createSession(seed);
    for (let day = 2; day <= 12; day++) {
      const before = state;
      state = advanceDay(state);
      const delta = fundamentalChange(COMPANIES[4], state.economy);
      const effect = day === 7 ? state.lantern.revenue_effect : 0;
      close(state.companies[4].current_revenue,
        before.companies[4].current_revenue + delta.revenue + effect);
      assert.equal(state.companies[4].current_costs, before.companies[4].current_costs + delta.costs);
      if (day === 7) {
        seen.add(state.lantern.product_event_result);
        assert.equal(state.lantern.revenue_effect,
          { weak: -1, neutral: 0, strong: 1 }[state.lantern.product_event_result]);
        close(state.companies[4].expected_profit, state.companies[4].last_reported_profit
          + 0.5 * (state.companies[4].current_profit - state.companies[4].last_reported_profit));
      }
      if (day > 7) assert.deepEqual(state.lantern, before.lantern);
      if (day === 8) assert.equal(state.earnings_reports.at(-1).companies[4].current.revenue,
        state.companies[4].current_revenue);
    }
  }
  assert.deepEqual([...seen].sort(), ['neutral', 'strong', 'weak']);
});

test('same seed reproduces every external market state independently of cash/holdings', () => {
  let first = createSession(2026);
  let second = createSession(2026);
  second.cash = 60;
  second.holdings_by_company.northstar = 2;
  second.companies[0].shares_owned = 2;
  for (let day = 2; day <= 12; day++) {
    first = advanceDay(first);
    second = advanceDay(second);
    assert.deepEqual(first.economy, second.economy);
    assert.deepEqual(first.lantern, second.lantern);
    assert.deepEqual(first.earnings_reports, second.earnings_reports);
    assert.equal(first.random_state, second.random_state);
    first.companies.forEach((company, i) => {
      const { shares_owned: ignoredFirst, ...marketFirst } = company;
      const { shares_owned: ignoredSecond, ...marketSecond } = second.companies[i];
      assert.deepEqual(marketFirst, marketSecond);
    });
    close(second.current_total_value, 60 + 2 * second.companies[0].current_price);
  }
});

test('reset of completed session exactly reproduces fresh state and subsequent sequence', () => {
  let state = createSession(0xffffffff);
  while (!state.session_complete) state = advanceDay(state);
  const reset = resetSession(state);
  assert.deepEqual(reset, createSession(0xffffffff));
  assert.deepEqual(advanceDay(reset), advanceDay(createSession(0xffffffff)));
});
