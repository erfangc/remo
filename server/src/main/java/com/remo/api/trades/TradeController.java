package com.remo.api.trades;

import com.remo.api.portfolios.Portfolio;
import com.remo.api.portfolios.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.security.Principal;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static java.util.UUID.randomUUID;
import static java.util.stream.Collectors.joining;

/**
 * {@link TradeController} controls the retrieval and placing of trades
 * <p>
 * trades should not be placed without going through this controller
 * Created by erfangchen on 7/9/17.
 */
@RestController
@RequestMapping("api/trades/{portfolioID}")
public class TradeController {

    private TradeRepository tradeRepository;
    private PortfolioRepository portfolioRepository;
    private NamedParameterJdbcTemplate jdbcTemplate;
    private String placeTradeSQL;

    @Autowired
    public TradeController(TradeRepository tradeRepository,
                           PortfolioRepository portfolioRepository,
                           NamedParameterJdbcTemplate namedParameterJdbcTemplate) throws IOException {
        this.tradeRepository = tradeRepository;
        this.portfolioRepository = portfolioRepository;
        this.jdbcTemplate = namedParameterJdbcTemplate;
        BufferedReader reader = new BufferedReader(new InputStreamReader(new ClassPathResource("place-trade-postgre.sql").getInputStream()));
        this.placeTradeSQL = reader.lines().collect(joining("\n"));
        reader.close();
    }

    /**
     * this method deletes existing trade without reverting money impact
     */
    @DeleteMapping("{tradeID}")
    public ResponseEntity<List<Trade>> deleteByTradeID(Principal principal,
                                                       @PathVariable UUID portfolioID,
                                                       @PathVariable UUID tradeID) {
        Portfolio portfolio = portfolioRepository.findOne(portfolioID);
        if (portfolio.getUsername().equals(principal.getName())) {
            tradeRepository.delete(tradeID);
            return ResponseEntity.ok(tradeRepository.findByPortfolioID(portfolioID));
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping
    public ResponseEntity<List<Trade>> getByPortfolioID(Principal principal, @PathVariable UUID portfolioID) {
        Portfolio portfolio = portfolioRepository.findOne(portfolioID);
        if (portfolio.getUsername().equals(principal.getName())) {
            return new ResponseEntity<>(tradeRepository.findByPortfolioID(portfolioID), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @PutMapping
    public ResponseEntity<PlaceTradeResponse> placeTrade(Principal principal,
                                                         @RequestBody Trade trade,
                                                         @PathVariable UUID portfolioID) throws IOException {
        /*
        first we must ensure the user has permission to place trade on the given portfolio
         */
        Portfolio portfolio = portfolioRepository.findOne(portfolioID);
        if (portfolio.getUsername().equals(principal.getName())) {
            return attemptToPlaceTrade(trade, portfolioID);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    private ResponseEntity<PlaceTradeResponse> attemptToPlaceTrade(Trade trade, UUID portfolioID) {
        try {
            final UUID tradeID = randomUUID();
            trade.setTradeID(tradeID);
            trade.setTradeTime(Date.from(Instant.now()));
            trade.setPortfolioID(portfolioID);

            final double netMoney = -1 * trade.getQuantity() * (trade.getPrice() + trade.getAccruedInterest());
            final String currency = trade.getCurrency();

            /*
            only validate if a cash balance exists does not actually check if you have enough
            that is delegated to a table level constraint
             */
            validateCashBalanceExists(portfolioID, currency);

            /*
            we read the SQL queries that form our transaction
            as always, transactions must be atomic and isolated
            we rely on on the underlying databases to rollback failed concurrent transactions + reapply our transactions
            we use the default isolation level (this could be tunable in the future
             */

            SqlParameterSource paramSource = new MapSqlParameterSource()
                    .addValue("net_money", netMoney)
                    .addValue("portfolio_id", portfolioID)
                    .addValue("currency", currency)
                    .addValue("trade_id", tradeID)
                    .addValue("security_id", trade.getSecurityID())
                    .addValue("security_id_type", trade.getSecurityIDType())
                    .addValue("trade_time", trade.getTradeTime())
                    .addValue("quantity", trade.getQuantity())
                    .addValue("price", trade.getPrice())
                    .addValue("accrued_interest", trade.getAccruedInterest())
                    .addValue("commission", trade.getCommission())
                    .addValue("description", trade.getDescription());
            jdbcTemplate.update(
                    placeTradeSQL,
                    paramSource
            );

            /*
            we retrieve everything again to make sure the front-end see the updated balance
             */
            Portfolio updatedPortfolio = portfolioRepository.findOne(portfolioID);
            return ResponseEntity
                    .ok(new PlaceTradeResponse()
                            .setPlacedTrade(trade)
                            .setUpdatedPortfolio(updatedPortfolio)
                    );
        } catch (DataAccessException e) {
            // TODO depending on the SQL exception we may need to return different status codes
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    private void validateCashBalanceExists(UUID portfolioID, String currency) {
        List<Map<String, Object>> cash = jdbcTemplate
                .queryForList(
                        "SELECT 1 FROM remo.cash_balances WHERE portfolio_id = :portfolio_id AND currency = :currency",
                        new MapSqlParameterSource()
                                .addValue("portfolio_id", portfolioID)
                                .addValue("currency", currency)
                );
        if (cash.isEmpty()) {
            throw new IllegalStateException("You don't have any money in " + currency);
        }
    }

}
