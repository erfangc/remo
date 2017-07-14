# Remo (Work-in-Progress)
Remo is a cloud compatible trading system and stock analysis tool. It is designed to be used
by a large number of concurrent users each represented by an account on the system

Once an account has been registered, users are free to create new portfolios and begin placing (simulated trades)

# Goals
Remo is a demonstration of multiple pieces of technology working in-conjunction

- PostgreSQL (potentially multi-instance + user based sharding or read-replica load balanced) for OTLP and transaction support

- Cassandra to store synchronized positions (from the entire distributed transaction system)

- Java App Server to handle transaction business logic and portfolio analytics

- Spark Streaming / Apache Ignite Compute Grid + Data Grid to perform large scale analytics and build an in-memory reactive store for value-added analysis on top of transaction and other reference data

- Spring Security via Jdbc to control user accounts and authorities

- React Redux + TypeScript to build a SPA front-end that seamless take the user from registration to trading to analytics all in a single App

# Cloud Compatibility
Remo will be designed to take advantage of automated-provisioning on cloud platforms, starting with Amazon Web Services

The software will ship with scripts / utilities to automate the provisioning and deployment of

 - VPC and Security Groups
 - Elastic Beanstalk AppServer environments with auto-scaling groups
 - EMR or Cloudera over a private subnet to handle distributed compute

The goal of this PoC is to show that the entire codebase and its supporting
RDBMS instances and NoSQL infrastructure and security apparatus can be be automatically
provisioned and deployed at any organizing requiring such capabilities

# Planned Capabilities

## Trading Simulation
 - Multiple portfolios per account
 - Proper cash and position accounting
 - Live results

## Live Single Portfolio Reporting

### Performance Analysis
 - IRR
 - Time-Weighted Return Attribution

### Portfolio Characteristics Reports
 - GICS sector analysis
 - LMS / GMV factor exposure

## Live Administrator Dashboard Reporting
 - God-view into all user accounts for site administrators
 - Dashboard capabilities

# Development
This is a hobbist project used to demonstrate the capabilities of various technologies and techniques
for building a modern distributed business system. I plan to build the system in phases

## Phase 1 - Transaction Platform Development
   This phase will conclude the build out of the core transaction logic. Including the following domain models
   - User Account / Authentication + Signup
   - Portfolio Entities
   - Trade / Position Entities
   This phase will not include security data

## Phase 2 - Security Repository
   this phase will conclude the build out the Stock and potentially Exchange Traded product repository and the corresponding ingestion process
   and data stores
  - Source US or Global equity indicative + financial statements
  - Equity price time-series (maybe via live API calls instead of stored)
  - Create ElasticSearch service

## Phase 4 - Security Analytics Microservice

## Phase 5 - Portfolio Valuation and Analysis

## Phase 6 - Real-Time 'Godview' Dashboard

# Notes

## UI
Unlike many React/Redux projects found on the internet, I choose to organize front-end by domain instead of by
its framework constructs

i.e.

```
|_user
    |_component
    |_reducers
    |_actions
    
|_portfolio
    |_component
    |_reducers
    |_actions
...
```

Instead of
```
|_reducers
|_actions
|_portfolio
```