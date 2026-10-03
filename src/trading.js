// CP2 trading rules. The frozen CP1 market simulation is imported unchanged.
export function portfolioValue(session) {
  return session.cash + session.companies.reduce((total, company) =>
    total + session.holdings_by_company[company.id] * company.current_price, 0);
}

export function assessTrade(session, side, companyId, quantity) {
  const reject = (message) => ({ ok: false, message });
  if (session.session_complete) return reject('The session is complete. Trading is closed.');
  if (side !== 'buy' && side !== 'sell') return reject('Choose Buy or Sell.');
  const company = session.companies.find(({ id }) => id === companyId);
  if (!company) return reject('Select a company.');
  if (!Number.isSafeInteger(quantity) || quantity <= 0) return reject('Enter a positive whole number of shares.');
  const holdings = session.holdings_by_company[companyId];
  const cost = quantity * company.current_price;
  if (side === 'sell') {
    if (quantity > holdings) return reject('You do not own enough shares.');
    return { ok: true, cost, message: '' };
  }
  if (cost > session.cash) return reject('You do not have enough cash.');
  const newHoldings = holdings + quantity;
  if (!Number.isSafeInteger(newHoldings)) return reject('Share quantity is too large.');
  const total = portfolioValue(session);
  // Only machine precision is tolerated at the cap, never a displayed cent.
  const precision = Number.EPSILON * Math.max(1, total) * 8;
  if (newHoldings * company.current_price > total * 0.8 + precision) {
    return reject('Buying would put more than 80% of your total value in this company.');
  }
  return { ok: true, cost, message: '' };
}

export function trade(session, side, companyId, quantity) {
  const assessment = assessTrade(session, side, companyId, quantity);
  if (!assessment.ok) return { ...assessment, session };
  const next = structuredClone(session);
  const company = next.companies.find(({ id }) => id === companyId);
  const sign = side === 'buy' ? 1 : -1;
  next.cash -= sign * assessment.cost;
  next.holdings_by_company[companyId] += sign * quantity;
  company.shares_owned = next.holdings_by_company[companyId];
  next.current_total_value = portfolioValue(next);
  return { ok: true, session: next, message: `${side === 'buy' ? 'Bought' : 'Sold'} ${quantity} ${quantity === 1 ? 'share' : 'shares'}.` };
}
