import test from 'node:test';
import assert from 'node:assert/strict';
import { createSession, advanceDay, resetSession } from '../src/market.js';
import { portfolioValue, assessTrade, trade } from '../src/trading.js';

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-10);

test('buy is immediate, fee-free, preserves total and synchronizes both holdings fields', () => {
  const before = createSession(2026);
  const result = trade(before, 'buy', 'northstar', 2);
  assert.equal(result.ok, true);
  assert.equal(result.session.cash, 60);
  assert.equal(result.session.holdings_by_company.northstar, 2);
  assert.equal(result.session.companies[0].shares_owned, 2);
  assert.equal(result.session.current_total_value, 100);
  assert.equal(before.cash, 100);
  assert.equal(before.holdings_by_company.northstar, 0);
  assert.equal(result.session.random_state, before.random_state);
});

test('buy exactly at 80% is accepted; above the cap is rejected without mutation', () => {
  const before = createSession(1);
  const allowed = trade(before, 'buy', 'northstar', 4);
  assert.equal(allowed.ok, true);
  assert.equal(allowed.session.cash, 20);
  assert.equal(allowed.session.holdings_by_company.northstar, 4);
  const rejected = trade(before, 'buy', 'northstar', 5);
  assert.equal(rejected.ok, false);
  assert.match(rejected.message, /80%/);
  assert.equal(rejected.session, before);
  const repeated = trade(allowed.session, 'buy', 'northstar', 1);
  assert.equal(repeated.ok, false);
  assert.match(repeated.message, /80%/);
});

test('cap calculation uses cash plus every company at live market prices', () => {
  let session = trade(createSession(1), 'buy', 'northstar', 4).session;
  session = trade(session, 'buy', 'hearthline', 1).session;
  assert.equal(session.cash, 0);
  assert.equal(portfolioValue(session), 100);
  session.companies[0].current_price = 30;
  session.companies[1].current_price = 10;
  assert.equal(portfolioValue(session), 130);
  session = trade(session, 'sell', 'northstar', 1).session;
  assert.equal(session.cash, 30);
  assert.equal(portfolioValue(session), 130);
  assert.equal(assessTrade(session, 'buy', 'northstar', 1).ok, false);
  assert.match(assessTrade(session, 'buy', 'northstar', 1).message, /80%/);
  assert.equal(assessTrade(session, 'buy', 'hearthline', 3).ok, true);
});

test('selling is allowed above the cap after drift and cannot sell unowned shares', () => {
  const session = trade(createSession(1), 'buy', 'northstar', 4).session;
  session.companies[0].current_price = 30;
  assert.ok(120 / portfolioValue(session) > 0.8);
  const result = trade(session, 'sell', 'northstar', 2);
  assert.equal(result.ok, true);
  assert.equal(result.session.cash, 80);
  assert.equal(result.session.holdings_by_company.northstar, 2);
  assert.equal(result.session.companies[0].shares_owned, 2);
  assert.equal(result.session.current_total_value, 140);
  assert.equal(trade(result.session, 'sell', 'northstar', 3).ok, false);
  assert.equal(trade(createSession(1), 'sell', 'northstar', 1).ok, false);
});

test('invalid quantities, side and company are rejected without changing state', () => {
  const session = createSession(1);
  const before = structuredClone(session);
  for (const quantity of [0, -1, 1.5, NaN, Infinity, '1', Number.MAX_SAFE_INTEGER + 1]) {
    for (const side of ['buy', 'sell']) {
      const result = trade(session, side, 'northstar', quantity);
      assert.equal(result.ok, false);
      assert.equal(result.session, session);
    }
  }
  assert.equal(trade(session, 'hold', 'northstar', 1).ok, false);
  assert.equal(trade(session, 'buy', 'unknown', 1).ok, false);
  assert.deepEqual(session, before);
});

test('affordability uses full live precision with no cent-sized tolerance or leverage', () => {
  const session = createSession(1);
  session.cash = 19.9999999;
  assert.equal(trade(session, 'buy', 'northstar', 1).ok, false);
  session.cash = 20;
  session.holdings_by_company.hearthline = 1;
  session.companies[1].shares_owned = 1;
  const exact = trade(session, 'buy', 'northstar', 1);
  assert.equal(exact.ok, true);
  assert.equal(exact.session.cash, 0);
  assert.equal(trade(exact.session, 'buy', 'hearthline', 1).ok, false);
});

test('fractional market prices trade without intermediate rounding and revalidate live values', () => {
  const session = createSession(1);
  session.companies[0].current_price = 20.123456789;
  const buy = trade(session, 'buy', 'northstar', 2);
  assert.equal(buy.session.cash, 100 - 2 * 20.123456789);
  const sell = trade(buy.session, 'sell', 'northstar', 2);
  close(sell.session.cash, 100);
  assert.equal(sell.session.holdings_by_company.northstar, 0);
  assert.equal(assessTrade(session, 'buy', 'northstar', 1).ok, true);
  session.cash = 1;
  assert.equal(trade(session, 'buy', 'northstar', 1).ok, false);
});

test('12-day trading session preserves external market sequence, values holdings and closes trading', () => {
  let marketOnly = createSession(2026);
  let traded = trade(createSession(2026), 'buy', 'northstar', 2).session;
  traded = trade(traded, 'buy', 'kestrel', 1).session;
  for (let day = 2; day <= 12; day++) {
    marketOnly = advanceDay(marketOnly);
    traded = advanceDay(traded);
    assert.equal(traded.random_state, marketOnly.random_state);
    assert.deepEqual(traded.economy, marketOnly.economy);
    assert.deepEqual(traded.lantern, marketOnly.lantern);
    assert.deepEqual(traded.earnings_reports, marketOnly.earnings_reports);
    traded.companies.forEach((company, index) => {
      const { shares_owned: ignoredActual, ...actual } = company;
      const { shares_owned: ignoredExpected, ...expected } = marketOnly.companies[index];
      assert.deepEqual(actual, expected);
    });
    close(traded.current_total_value, portfolioValue(traded));
    if (day === 5) traded = trade(traded, 'sell', 'northstar', 1).session;
  }
  assert.equal(traded.session_complete, true);
  assert.equal(trade(traded, 'buy', 'northstar', 1).ok, false);
  assert.equal(trade(traded, 'sell', 'northstar', 1).ok, false);
  assert.throws(() => advanceDay(traded), /session is complete/);
  assert.deepEqual(resetSession(traded), createSession(2026));
});
