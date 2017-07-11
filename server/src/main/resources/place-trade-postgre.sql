/*
this SQL file encapsulates 'transaction' triggered via placing a trade
the cash balance in the account should decrease while the trade is inserted atomically

the account cannot trade more than it has cash to fund the transaction in
 */

BEGIN;
-- update cash balances as trades should impact cash
UPDATE remo.cash_balances
SET quantity = quantity + ?
WHERE
  portfolio_id = ?
  AND currency = ?;

-- update the trades table
INSERT INTO remo.trades (
  portfolio_id,
  trade_id,
  security_id,
  security_id_type,
  trade_time,
  quantity,
  price,
  accrued_interest,
  currency,
  commission,
  description
) VALUES (
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?
);

COMMIT;
