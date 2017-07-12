package com.remo.api;

import com.remo.api.portfolios.Portfolio;
import com.remo.api.portfolios.PortfolioController;
import com.remo.api.trades.Trade;
import com.remo.api.trades.TradeController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

/**
 * Initializes the App's front-end state
 * Created by erfangchen on 7/10/17.
 */
@RestController
@RequestMapping("api/init")
public class InitializationController {

    private PortfolioController portfolioController;
    private TradeController tradeController;

    @Autowired
    public InitializationController(PortfolioController portfolioController, TradeController tradeController) {
        this.portfolioController = portfolioController;
        this.tradeController = tradeController;
    }

    @GetMapping
    public ResponseEntity<InitializationResponse> get(Principal principal) {
        List<Portfolio> portfolios = portfolioController.getAll(principal);
        /*
        for initialization, we always retrieve all of the users' portfolios
         and all the trades of his 1st portfolio
         */
        ResponseEntity<InitializationResponse> resp;
        if (portfolios == null || portfolios.isEmpty()) {
            /*
            if the user does not have a portfolio - then return defaults for everything
             */
            resp = ResponseEntity.ok(new InitializationResponse());
        } else {
            UUID portfolioID = portfolios.get(0).getPortfolioID();
            ResponseEntity<List<Trade>> trades = tradeController.getByPortfolioID(principal, portfolioID);
            if (trades.getStatusCode().equals(HttpStatus.OK)) {
                resp = ResponseEntity.ok(
                        new InitializationResponse()
                                .setTrades(trades.getBody())
                                .setPortfolios(portfolios)
                                .setActivePortfolio(0)
                );
            } else {
                resp = new ResponseEntity<>(trades.getStatusCode());
            }
        }
        return resp;
    }

}
