// E0-X1 v0.1.1 simulation core. No trading or presentation behavior.
export const COMPANIES = Object.freeze([
  { id: 'northstar', name: 'Northstar Foods', sector: 'Consumer', initial_revenue: 100, initial_costs: 80, initial_profit: 20, demand_sensitivity: 2, cost_sensitivity: 2, trait_type: 'defensive-demand' },
  { id: 'hearthline', name: 'Hearthline Retail', sector: 'Consumer', initial_revenue: 100, initial_costs: 82, initial_profit: 18, demand_sensitivity: 4, cost_sensitivity: 1, trait_type: 'high-demand-exposure' },
  { id: 'brightfizz', name: 'BrightFizz Drinks', sector: 'Consumer', initial_revenue: 100, initial_costs: 78, initial_profit: 22, demand_sensitivity: 3, cost_sensitivity: 4, trait_type: 'input-exposure' },
  { id: 'kestrel', name: 'Kestrel Systems', sector: 'Technology', initial_revenue: 100, initial_costs: 76, initial_profit: 24, demand_sensitivity: 1, cost_sensitivity: 1, trait_type: 'recurring-revenue' },
  { id: 'lantern', name: 'Lantern Devices', sector: 'Technology', initial_revenue: 100, initial_costs: 79, initial_profit: 21, demand_sensitivity: 3, cost_sensitivity: 3, trait_type: 'product-cycle' },
].map(Object.freeze));

const STARTING_ECONOMIES = Object.freeze([
  [-1, -1], [-1, 0], [0, -1], [0, 0], [0, 1], [1, 0], [1, 1],
].map(Object.freeze));

function requireSample(sample) {
  if (!Number.isFinite(sample) || sample < 0 || sample >= 1) {
    throw new RangeError('Random sample must be in [0, 1).');
  }
}

function requireEconomicState(state) {
  if (!Number.isInteger(state) || state < -1 || state > 1) {
    throw new RangeError('Economic state must be -1, 0, or 1.');
  }
}

// Mulberry32. All session randomness draws from the returned uint32 state.
export function nextRandom(randomState) {
  if (!Number.isInteger(randomState) || randomState < 0 || randomState > 0xffffffff) {
    throw new RangeError('Seed/state must be an unsigned 32-bit integer.');
  }
  const state = (randomState + 0x6d2b79f5) >>> 0;
  let value = Math.imul(state ^ (state >>> 15), state | 1);
  value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
  return { state, sample: ((value ^ (value >>> 14)) >>> 0) / 4294967296 };
}

export function initialEconomy(sample) {
  requireSample(sample);
  const [consumer_demand, cost_pressure] = STARTING_ECONOMIES[Math.floor(sample * 7)];
  return { consumer_demand, cost_pressure };
}

export function transitionEconomicState(state, sample) {
  requireEconomicState(state);
  requireSample(sample);
  const step = sample < 0.6 ? 0 : sample < 0.8 ? 1 : -1;
  return Math.max(-1, Math.min(1, state + step));
}

export function dailyNoise(sample) {
  requireSample(sample);
  return [-0.02, -0.01, 0, 0.01, 0.02][Math.floor(sample * 5)];
}

export function productReception(sample) {
  requireSample(sample);
  return ['weak', 'neutral', 'strong'][Math.floor(sample * 3)];
}

export function fundamentalChange(definition, economy) {
  requireEconomicState(economy.consumer_demand);
  requireEconomicState(economy.cost_pressure);
  const defensive = definition.trait_type === 'defensive-demand'
    || definition.trait_type === 'recurring-revenue';
  const demandFactor = defensive && economy.consumer_demand === -1 ? 0.5 : 1;
  return {
    revenue: economy.consumer_demand * definition.demand_sensitivity * 0.25 * demandFactor,
    costs: economy.cost_pressure * definition.cost_sensitivity * 0.25,
  };
}

export function referencePrice(profit, initialProfit) {
  if (!Number.isFinite(profit) || !Number.isFinite(initialProfit) || initialProfit <= 0) {
    throw new RangeError('Profit must be finite and initial profit must be positive.');
  }
  return 20 * Math.max(profit, initialProfit * 0.25) / initialProfit;
}

export function expectedProfit(currentProfit, lastReportedProfit) {
  return lastReportedProfit + 0.5 * (currentProfit - lastReportedProfit);
}

export function ordinaryPrice(price, expectedReferencePrice, noise) {
  return (price + 0.5 * (expectedReferencePrice - price)) * (1 + noise);
}

export function earningsPrice(price, trueReferencePrice) {
  return price + 0.75 * (trueReferencePrice - price);
}

export function informationAtDay(day) {
  return {
    descriptions_visible: day >= 2,
    consumer_demand_visible: day >= 3,
    earnings_visible: day >= 4,
    cost_pressure_visible: day >= 5,
    sensitivities_visible: day >= 6,
    lantern_event_visible: day >= 7,
  };
}

export function createSession(seed = 1) {
  const first = nextRandom(seed);
  return {
    current_day: 1,
    starting_cash: 100,
    cash: 100,
    holdings_by_company: Object.fromEntries(COMPANIES.map(({ id }) => [id, 0])),
    current_total_value: 100,
    random_seed: seed,
    random_state: first.state,
    session_complete: false,
    economy: initialEconomy(first.sample),
    information_visibility: informationAtDay(1),
    lantern: { product_event_result: null, product_event_resolved: false, revenue_effect: 0 },
    earnings_reports: [],
    companies: COMPANIES.map((definition) => ({
      id: definition.id,
      current_revenue: definition.initial_revenue,
      current_costs: definition.initial_costs,
      current_profit: definition.initial_profit,
      last_reported_revenue: definition.initial_revenue,
      last_reported_costs: definition.initial_costs,
      last_reported_profit: definition.initial_profit,
      current_price: 20,
      reference_price: 20,
      expected_profit: definition.initial_profit,
      expected_reference_price: 20,
      price_history: [{ day: 1, price: 20 }],
      information_visibility: informationAtDay(1),
      shares_owned: 0,
    })),
  };
}

export function resetSession(session) {
  return createSession(session.random_seed);
}

function draw(session) {
  const result = nextRandom(session.random_state);
  session.random_state = result.state;
  return result.sample;
}

function refreshValuation(company, definition) {
  company.current_profit = company.current_revenue - company.current_costs;
  company.reference_price = referencePrice(company.current_profit, definition.initial_profit);
  company.expected_profit = expectedProfit(company.current_profit, company.last_reported_profit);
  company.expected_reference_price = referencePrice(company.expected_profit, definition.initial_profit);
}

export function advanceDay(session) {
  if (session.session_complete || session.current_day >= 12) {
    throw new RangeError('The session is complete; reset before advancing.');
  }
  // Return a new state so a failed advance cannot partly mutate the caller's state.
  const next = structuredClone(session);
  next.current_day += 1;
  const day = next.current_day;
  const isEarningsDay = day === 4 || day === 8 || day === 12;
  next.economy.consumer_demand = transitionEconomicState(next.economy.consumer_demand, draw(next));
  next.economy.cost_pressure = transitionEconomicState(next.economy.cost_pressure, draw(next));

  next.companies.forEach((company, i) => {
    const delta = fundamentalChange(COMPANIES[i], next.economy);
    company.current_revenue += delta.revenue;
    company.current_costs += delta.costs;
    refreshValuation(company, COMPANIES[i]);
    // User clarification: ordinary convergence and noise only on non-earnings days.
    if (!isEarningsDay) {
      company.current_price = ordinaryPrice(company.current_price,
        company.expected_reference_price, dailyNoise(draw(next)));
    }
  });

  next.information_visibility = informationAtDay(day);
  for (const company of next.companies) company.information_visibility = informationAtDay(day);

  // The plan places the Day 7 event after ordinary pricing. Its valuation effect
  // starts influencing prices on subsequent days; the revenue change occurs once.
  if (day === 7 && !next.lantern.product_event_resolved) {
    const result = productReception(draw(next));
    const effect = { weak: -1, neutral: 0, strong: 1 }[result];
    next.lantern = { product_event_result: result, product_event_resolved: true, revenue_effect: effect };
    const index = COMPANIES.findIndex(({ id }) => id === 'lantern');
    next.companies[index].current_revenue += effect;
    refreshValuation(next.companies[index], COMPANIES[index]);
  }

  if (isEarningsDay) {
    const report = { day, companies: [] };
    next.companies.forEach((company, i) => {
      const previous = { revenue: company.last_reported_revenue,
        costs: company.last_reported_costs, profit: company.last_reported_profit };
      const current = { revenue: company.current_revenue,
        costs: company.current_costs, profit: company.current_profit };
      const priceBefore = company.current_price;
      company.current_price = earningsPrice(priceBefore, company.reference_price);
      report.companies.push({ id: company.id, previous, current,
        change: { revenue: current.revenue - previous.revenue,
          costs: current.costs - previous.costs, profit: current.profit - previous.profit },
        price_before: priceBefore, price_after: company.current_price });
      company.last_reported_revenue = current.revenue;
      company.last_reported_costs = current.costs;
      company.last_reported_profit = current.profit;
      refreshValuation(company, COMPANIES[i]);
    });
    next.earnings_reports.push(report);
  }

  for (const company of next.companies) {
    company.price_history.push({ day, price: company.current_price });
  }
  // Cash and holdings are placeholders only. Trading belongs to CP2.
  next.current_total_value = next.cash + next.companies.reduce((value, company) =>
    value + next.holdings_by_company[company.id] * company.current_price, 0);
  next.session_complete = day === 12;
  return next;
}
