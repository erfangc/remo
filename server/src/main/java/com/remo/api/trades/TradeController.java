package com.remo.api.trades;

import com.remo.api.portfolios.Portfolio;
import com.remo.api.portfolios.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.security.Principal;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static java.util.UUID.randomUUID;
import static java.util.stream.Collectors.joining;

/**
 * {@link TradeController}
 * Created by erfangchen on 7/9/17.
 */
@RestController
@RequestMapping("api/trades/{portfolioID}")
public class TradeController {

    private TradeRepository tradeRepository;
    private PortfolioRepository portfolioRepository;
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public TradeController(TradeRepository tradeRepository,
                           PortfolioRepository portfolioRepository,
                           JdbcTemplate jdbcTemplate) {
        this.tradeRepository = tradeRepository;
        this.portfolioRepository = portfolioRepository;
        this.jdbcTemplate = jdbcTemplate;
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
    public ResponseEntity<?> placeTrade(Principal principal,
                                        @RequestBody Trade trade,
                                        @PathVariable UUID portfolioID) throws IOException {
        Portfolio portfolio = portfolioRepository.findOne(portfolioID);
        if (portfolio.getUsername().equals(principal.getName())) {
            final UUID tradeID = randomUUID();
            trade.setTradeID(tradeID);
            trade.setTradeTime(Date.from(Instant.now()));
            trade.setPortfolioID(portfolioID);

            final double netMoney = -1 * trade.getQuantity() * (trade.getPrice() + trade.getAccruedInterest());
            final String currency = trade.getCurrency();

            BufferedReader reader = new BufferedReader(new InputStreamReader(new ClassPathResource("place-trade-postgre.sql").getInputStream()));
            final String sql = reader.lines().collect(joining("\n"));

            jdbcTemplate
                    .update(
                            sql,
                            netMoney, portfolioID, currency,
                            portfolioID,
                            tradeID,
                            trade.getSecurityID(),
                            trade.getSecurityIDType(),
                            trade.getTradeTime(),
                            trade.getQuantity(),
                            trade.getPrice(),
                            trade.getAccruedInterest(),
                            currency,
                            trade.getCommission(),
                            trade.getDescription()
                    );

            reader.close();

            return ResponseEntity.ok("trade " + tradeID + " placed");
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

}
