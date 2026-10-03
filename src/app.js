import { COMPANIES, createSession, advanceDay } from './market.js';
import { assessTrade, trade, portfolioValue } from './trading.js';

let session = createSession(2026);
let selectedId = COMPANIES[0].id;
let busy = false;
let feedback = '';
const element = (id) => document.getElementById(id);
const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

function historyMarkup(history) {
  if (history.length < 2) return '<span class="flat">—</span>';
  const values = history.map(({ price }) => price);
  const low = Math.min(...values);
  const spread = Math.max(...values) - low || 1;
  const points = values.map((price, index) => `${index * 72 / (values.length - 1) + 2},${26 - (price - low) / spread * 24}`).join(' ');
  return `<svg viewBox="0 0 76 28" role="img" aria-label="Price history from Day 1 to Day ${session.current_day}"><polyline points="${points}"></polyline></svg>`;
}

function renderTradeControls() {
  const company = session.companies.find(({ id }) => id === selectedId);
  const quantity = Number(element('quantity').value);
  const buy = assessTrade(session, 'buy', selectedId, quantity);
  const sell = assessTrade(session, 'sell', selectedId, quantity);
  element('buy').disabled = busy || !buy.ok;
  element('sell').disabled = busy || !sell.ok;
  element('quantity').disabled = busy || session.session_complete;
  element('trade-value').textContent = Number.isSafeInteger(quantity) && quantity > 0
    ? `Trade value: ${money(quantity * company.current_price)}` : 'Enter a positive whole number of shares.';
  element('trade-feedback').textContent = feedback;
  element('trade-limits').textContent = busy ? 'Advancing the market…'
    : session.session_complete ? 'Trading is closed.'
      : [!buy.ok ? `Buy: ${buy.message}` : '', !sell.ok ? `Sell: ${sell.message}` : ''].filter(Boolean).join(' ');
}

function render() {
  const total = portfolioValue(session);
  element('day').textContent = `Day ${session.current_day} of 12`;
  const nextEarnings = [4, 8, 12].find((day) => day > session.current_day);
  element('next-earnings').textContent = nextEarnings ? `Next earnings: Day ${nextEarnings}` : 'Final day complete';
  element('cash').textContent = money(session.cash);
  element('invested').textContent = money(total - session.cash);
  element('total').textContent = money(total);
  element('companies').innerHTML = session.companies.map((company, index) => {
    const definition = COMPANIES[index];
    const prior = company.price_history[Math.max(0, company.price_history.length - 4)].price;
    const change = (company.current_price / prior - 1) * 100;
    const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'flat';
    const text = company.price_history.length < 2 ? '—' : `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
    return `<tr class="${company.id === selectedId ? 'selected' : ''}">
      <td><button type="button" class="company-button" data-company="${company.id}" aria-pressed="${company.id === selectedId}">${definition.name}<span>${definition.sector}</span></button></td>
      <td>${money(company.current_price)}</td><td class="${direction}">${text}</td>
      <td>${historyMarkup(company.price_history)}</td><td>${session.holdings_by_company[company.id]}</td></tr>`;
  }).join('');
  const company = session.companies.find(({ id }) => id === selectedId);
  const definition = COMPANIES.find(({ id }) => id === selectedId);
  const shares = session.holdings_by_company[selectedId];
  const position = shares * company.current_price;
  element('selected-name').textContent = definition.name;
  element('selected-sector').textContent = definition.sector;
  element('selected-price').textContent = money(company.current_price);
  element('selected-shares').textContent = shares;
  element('position-value').textContent = money(position);
  element('concentration').textContent = `${(position / total * 100).toFixed(1)}%`;
  element('advance').disabled = busy || session.session_complete;
  element('advance').textContent = session.session_complete ? 'Session complete' : busy ? 'Advancing…' : 'Advance Day';
  element('session-status').textContent = session.session_complete
    ? 'Day 12 complete. Final earnings are resolved. Trading is closed.'
    : busy ? `Day ${session.current_day} prices updated.` : 'Observe prices, buy or sell, then advance the day.';
  renderTradeControls();
}

element('companies').addEventListener('click', (event) => {
  const button = event.target.closest('[data-company]');
  if (!button || busy) return;
  selectedId = button.dataset.company;
  feedback = '';
  render();
});
element('quantity').addEventListener('input', () => { feedback = ''; renderTradeControls(); });
for (const side of ['buy', 'sell']) {
  element(side).addEventListener('click', () => {
    if (busy) return;
    // Revalidate against live prices/cash even if a displayed button was enabled.
    const result = trade(session, side, selectedId, Number(element('quantity').value));
    session = result.session;
    feedback = result.message;
    render();
  });
}
element('advance').addEventListener('click', (event) => {
  if (event.detail > 1 || busy || session.session_complete) return;
  busy = true;
  session = advanceDay(session);
  feedback = '';
  render();
  // Keep the action locked across the second click of a normal double-click.
  window.setTimeout(() => { busy = false; render(); }, 400);
});
render();
