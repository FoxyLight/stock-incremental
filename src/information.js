import { COMPANIES } from './market.js';
import { portfolioValue } from './trading.js';

// Authored presentation copy. It adds no company mechanics or numeric rules.
const descriptions = {
  northstar: 'Produces food for household consumers.',
  hearthline: 'Sells goods to consumers through its retail business.',
  brightfizz: 'Produces and sells drinks to consumers.',
  kestrel: 'Provides technology systems through recurring contracts.',
  lantern: 'Develops and sells technology devices.',
};
const traits = {
  northstar: 'Weak Demand has a reduced negative effect on Revenue.',
  hearthline: 'Revenue is especially responsive to changes in Demand.',
  brightfizz: 'Costs are especially responsive to changes in Cost Pressure.',
  kestrel: 'Recurring revenue reduces the negative effect of Weak Demand.',
  lantern: 'A product reception event can change Revenue.',
};
const exposure = { 1: 'Low', 2: 'Moderate', 3: 'High', 4: 'Very high' };
const demand = { '-1': 'Weak', 0: 'Normal', 1: 'Strong' };
const pressure = { '-1': 'Low', 0: 'Normal', 1: 'High' };
const receptions = {
  weak: 'Weak reception. The product event reduced Lantern\'s Revenue.',
  neutral: 'Neutral reception. The product event did not change Lantern\'s Revenue.',
  strong: 'Strong reception. The product event improved Lantern\'s Revenue.',
};

export function presentInformation(session, previous = null) {
  const flags = session.information_visibility;
  const report = flags.earnings_visible ? session.earnings_reports.at(-1) : null;
  const messages = [];
  if (!previous) {
    messages.push('Start with $100 cash. Select a company to trade, or hold cash and advance.');
  } else {
    const old = previous.information_visibility;
    if (flags.descriptions_visible && !old.descriptions_visible) messages.push('Business descriptions are now available in company details.');
    if (flags.consumer_demand_visible && !old.consumer_demand_visible) messages.push(`Consumer Demand is now visible: ${demand[session.economy.consumer_demand]}.`);
    else if (flags.consumer_demand_visible && previous.economy.consumer_demand !== session.economy.consumer_demand) messages.push(`Consumer Demand: ${demand[previous.economy.consumer_demand]} → ${demand[session.economy.consumer_demand]}.`);
    if (flags.cost_pressure_visible && !old.cost_pressure_visible) messages.push(`Cost Pressure is now visible: ${pressure[session.economy.cost_pressure]}.`);
    else if (flags.cost_pressure_visible && previous.economy.cost_pressure !== session.economy.cost_pressure) messages.push(`Cost Pressure: ${pressure[previous.economy.cost_pressure]} → ${pressure[session.economy.cost_pressure]}.`);
    if (flags.sensitivities_visible && !old.sensitivities_visible) messages.push('Qualitative company sensitivities are now available in company details.');
    if (flags.lantern_event_visible && session.lantern.product_event_resolved && !previous.lantern.product_event_resolved) messages.push('Lantern Devices product reception has been announced. Read the company event below.');
    if (report && report.day === session.current_day) messages.push(`Day ${report.day} earnings are published. Compare the new report with the previous reported results.`);
    const rises = session.companies.filter((company, i) => company.current_price > previous.companies[i].current_price).length;
    const falls = session.companies.filter((company, i) => company.current_price < previous.companies[i].current_price).length;
    messages.push(`Prices updated: ${rises} rose, ${falls} fell, ${5 - rises - falls} unchanged.`);
    if (session.session_complete) messages.push('Final earnings are resolved. Trading is closed. Your session result is available.');
  }
  return {
    consumer_demand: flags.consumer_demand_visible ? demand[session.economy.consumer_demand] : null,
    cost_pressure: flags.cost_pressure_visible ? pressure[session.economy.cost_pressure] : null,
    companies: COMPANIES.map((company) => ({
      id: company.id,
      description: flags.descriptions_visible ? descriptions[company.id] : null,
      sensitivities: flags.sensitivities_visible ? {
        demand: exposure[company.demand_sensitivity],
        costs: exposure[company.cost_sensitivity],
        trait: traits[company.id],
      } : null,
    })),
    earnings: report ? { day: report.day, companies: report.companies.map((company) => ({
      id: company.id,
      name: COMPANIES.find(({ id }) => id === company.id).name,
      previous: { ...company.previous },
      current: { ...company.current },
      change: { ...company.change },
      price_before: company.price_before,
      price_after: company.price_after,
    })) } : null,
    lantern: flags.lantern_event_visible && session.lantern.product_event_resolved ? {
      day: 7,
      reception: session.lantern.product_event_result,
      message: receptions[session.lantern.product_event_result],
    } : null,
    results: session.session_complete ? {
      starting_value: session.starting_cash,
      final_value: portfolioValue(session),
      gain_loss: portfolioValue(session) - session.starting_cash,
    } : null,
    messages,
  };
}
