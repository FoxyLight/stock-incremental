import test from 'node:test';
import assert from 'node:assert/strict';
import { createSession, advanceDay } from '../src/market.js';
import { trade, portfolioValue } from '../src/trading.js';
import { presentInformation } from '../src/information.js';

function onDay(day) {
  let state = createSession(2026);
  while (state.current_day < day) state = advanceDay(state);
  return state;
}

test('presentation exposes no gated company/economy/report/event/results on Day 1', () => {
  const state = onDay(1);
  const before = structuredClone(state);
  const view = presentInformation(state);
  assert.equal(view.consumer_demand, null);
  assert.equal(view.cost_pressure, null);
  for (const company of view.companies) {
    assert.equal(company.description, null);
    assert.equal(company.sensitivities, null);
  }
  assert.equal(view.earnings, null);
  assert.equal(view.lantern, null);
  assert.equal(view.results, null);
  assert.deepEqual(state, before);
  assert.doesNotMatch(JSON.stringify(view), /random_state|random_seed|expected_profit|reference_price|current_revenue|demand_sensitivity|cost_sensitivity/);
});

test('each information category appears only on its approved day and remains available', () => {
  for (let day = 1; day <= 12; day++) {
    const view = presentInformation(onDay(day));
    assert.equal(view.companies.every((c) => c.description !== null), day >= 2);
    assert.equal(view.consumer_demand !== null, day >= 3);
    assert.equal(view.earnings !== null, day >= 4);
    assert.equal(view.cost_pressure !== null, day >= 5);
    assert.equal(view.companies.every((c) => c.sensitivities !== null), day >= 6);
    assert.equal(view.lantern !== null, day >= 7);
    assert.equal(view.results !== null, day === 12);
  }
});

test('revealed economy labels match the core and do not reveal prior hidden conditions', () => {
  for (const value of [-1, 0, 1]) {
    const current = onDay(5);
    current.economy = { consumer_demand: value, cost_pressure: value };
    const view = presentInformation(current);
    assert.equal(view.consumer_demand, ['Weak', 'Normal', 'Strong'][value + 1]);
    assert.equal(view.cost_pressure, ['Low', 'Normal', 'High'][value + 1]);
  }
  const previous = onDay(2);
  previous.economy.consumer_demand = 1;
  const current = onDay(3);
  current.economy.consumer_demand = -1;
  const messages = presentInformation(current, previous).messages.join(' ');
  assert.match(messages, /now visible: Weak/);
  assert.doesNotMatch(messages, /Strong/);
});

test('company copy stays descriptive and sensitivity labels hide numeric coefficients', () => {
  const view = presentInformation(onDay(6));
  assert.deepEqual(view.companies.map((c) => [c.sensitivities.demand, c.sensitivities.costs]),
    [['Moderate', 'Moderate'], ['Very high', 'Low'], ['High', 'Very high'], ['Low', 'Low'], ['High', 'High']]);
  for (const company of view.companies) {
    assert.ok(company.description.length > 10);
    assert.doesNotMatch(company.description + JSON.stringify(company.sensitivities), /\d|\bbuy\b|\bsell\b|best investment/i);
  }
  assert.match(view.companies[0].sensitivities.trait, /reduced negative effect/);
  assert.match(view.companies[3].sensitivities.trait, /Recurring revenue/);
});

test('earnings presentation uses only the latest published report, with prior/new/change and actual price response', () => {
  for (const day of [4, 5, 7, 8, 11, 12]) {
    const state = onDay(day);
    const view = presentInformation(state);
    const latest = state.earnings_reports.at(-1);
    assert.equal(view.earnings.day, latest.day);
    view.earnings.companies.forEach((row, i) => {
      assert.deepEqual(row.previous, latest.companies[i].previous);
      assert.deepEqual(row.current, latest.companies[i].current);
      assert.deepEqual(row.change, latest.companies[i].change);
      assert.equal(row.price_before, latest.companies[i].price_before);
      assert.equal(row.price_after, latest.companies[i].price_after);
      assert.ok(row.name.length > 0);
    });
    view.earnings.companies[0].current.profit = 999;
    assert.notEqual(latest.companies[0].current.profit, 999, 'view must not mutate source reports');
  }
  const state = onDay(5);
  state.companies[0].current_profit = -999;
  assert.notEqual(presentInformation(state).earnings.companies[0].current.profit, -999);
});

test('all Lantern receptions are readable on Day 7 with no hidden revenue amount', () => {
  for (const [reception, expression] of [['weak', /reduced/], ['neutral', /did not change/], ['strong', /improved/]]) {
    const state = onDay(7);
    state.lantern.product_event_result = reception;
    const event = presentInformation(state).lantern;
    assert.equal(event.day, 7);
    assert.equal(event.reception, reception);
    assert.match(event.message, expression);
    assert.match(event.message, /Lantern/);
    assert.doesNotMatch(event.message, /\d/);
  }
  assert.equal(presentInformation(onDay(6)).lantern, null);
});

test('daily notices identify reveals, actual economy changes, price directions and completion without recommendations', () => {
  let previous = onDay(1);
  for (let day = 2; day <= 12; day++) {
    const current = advanceDay(previous);
    const messages = presentInformation(current, previous).messages.join(' ');
    assert.match(messages, /Prices updated:/);
    if ([4, 8, 12].includes(day)) assert.match(messages, new RegExp(`Day ${day} earnings are published`));
    if (day === 7) assert.match(messages, /Lantern Devices/);
    if (day === 12) assert.match(messages, /Trading is closed/);
    assert.doesNotMatch(messages, /recommend|buy .+shares|sell .+shares|best company/i);
    previous = current;
  }
});

test('final results reflect actual cash/holdings, starting value and unrounded gain/loss', () => {
  let state = trade(createSession(2026), 'buy', 'northstar', 2).session;
  while (!state.session_complete) state = advanceDay(state);
  const view = presentInformation(state);
  assert.equal(view.results.starting_value, 100);
  assert.equal(view.results.final_value, portfolioValue(state));
  assert.equal(view.results.final_value, 60 + 2 * state.companies[0].current_price);
  assert.equal(view.results.gain_loss, view.results.final_value - 100);
  assert.equal(presentInformation(onDay(11)).results, null);
});
