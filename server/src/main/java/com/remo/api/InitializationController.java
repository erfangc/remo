package com.remo.api;

import com.remo.api.portfolios.Portfolio;
import com.remo.api.portfolios.PortfolioRepository;
import com.remo.api.trades.Trade;
import com.remo.api.trades.TradeRepository;
import com.remo.registration.ImmutableUser;
import com.remo.registration.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
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

    private PortfolioRepository portfolioRepository;
    private TradeRepository tradeRepository;
    private UserDetailService userDetailService;

    @Autowired
    public InitializationController(PortfolioRepository portfolioRepository, TradeRepository tradeRepository, UserDetailService userDetailService) {
        this.portfolioRepository = portfolioRepository;
        this.tradeRepository = tradeRepository;
        this.userDetailService = userDetailService;
    }

    @GetMapping
    public ResponseEntity<InitializationResponse> get(Principal principal) {
        List<Portfolio> portfolios = portfolioRepository.findByUsername(principal.getName());
        ImmutableUser user = ((ImmutableUser) userDetailService.loadUserByUsername(principal.getName())).withPassword("");
        /*
        for initialization, we always retrieve all of the users' portfolios
         and all the trades of his 1st portfolio
         */
        ResponseEntity<InitializationResponse> resp;
        if (portfolios == null || portfolios.isEmpty()) {
            /*
            if the user does not have a portfolio - then return defaults for everything
             */
            resp = ResponseEntity.ok(new InitializationResponse().setUser(user));
        } else {
            UUID portfolioID = portfolios.get(0).getPortfolioID();
            List<Trade> trades = tradeRepository.findByPortfolioID(portfolioID);
            resp = ResponseEntity.ok(
                    new InitializationResponse()
                            .setTrades(trades)
                            .setPortfolios(portfolios)
                            .setUser(user)
                            .setActivePortfolio(0));
        }
        return resp;
    }

}
