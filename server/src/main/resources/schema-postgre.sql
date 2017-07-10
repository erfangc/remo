DROP SCHEMA remo CASCADE;

CREATE SCHEMA remo;

-- create the user schema

CREATE TABLE remo.users (
  username   VARCHAR(50)  NOT NULL PRIMARY KEY,
  password   VARCHAR(500) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name  VARCHAR(255) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  occupation VARCHAR(100),
  enabled    BOOLEAN      NOT NULL
);

CREATE TABLE remo.authorities (
  username  VARCHAR(50) NOT NULL,
  authority VARCHAR(50) NOT NULL
);

CREATE UNIQUE INDEX ix_auth_username
  ON remo.authorities (username, authority);

-- create the portfolio schema + trading schema

CREATE TABLE remo.portfolios (
  portfolio_id   UUID         NOT NULL PRIMARY KEY,
  portfolio_name VARCHAR(255) NOT NULL,
  username       VARCHAR(50)  NOT NULL,
  currency       CHAR(3)      NOT NULL,
  description    VARCHAR(255)
);

CREATE INDEX ix_username
  ON remo.portfolios (username);

CREATE TABLE remo.trades (
  portfolio_id     UUID        NOT NULL,
  trade_id         UUID        NOT NULL PRIMARY KEY,
  security_id      VARCHAR(55) NOT NULL,
  security_id_type VARCHAR(55) NOT NULL,
  trade_time       TIMESTAMP   NOT NULL,
  quantity         FLOAT       NOT NULL,
  price            FLOAT       NOT NULL,
  accrued_interest FLOAT DEFAULT 0,
  currency         CHAR(3),
  commission       FLOAT DEFAULT 0,
  description      VARCHAR(255)
);

CREATE TABLE remo.cash_balances (
  portfolio_id UUID    NOT NULL,
  currency     CHAR(3) NOT NULL,
  quantity     FLOAT   NOT NULL CHECK (quantity >= 0),
  PRIMARY KEY (portfolio_id, currency)
);

CREATE INDEX ix_portfolio_security_ids
  ON remo.trades (portfolio_id, security_id_type, security_id);