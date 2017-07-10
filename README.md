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
