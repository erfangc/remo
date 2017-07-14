package com.remo.api;

import com.remo.api.portfolios.Portfolio;
import com.remo.api.trades.Trade;
import com.remo.registration.User;

import java.util.Collections;
import java.util.List;

/**
 * The shape of the initial response once the user has authenticated into the application
 */
public class InitializationResponse {

    private User user;
    private List<Portfolio> portfolios = Collections.emptyList();
    private Integer activePortfolio = null;
    private List<Trade> trades = Collections.emptyList();

    public List<Portfolio> getPortfolios() {
        return portfolios;
    }

    public InitializationResponse setPortfolios(List<Portfolio> portfolios) {
        this.portfolios = portfolios;
        return this;
    }

    public List<Trade> getTrades() {
        return trades;
    }

    public InitializationResponse setTrades(List<Trade> trades) {
        this.trades = trades;
        return this;
    }

    public Integer getActivePortfolio() {
        return activePortfolio;
    }

    public InitializationResponse setActivePortfolio(Integer activePortfolio) {
        this.activePortfolio = activePortfolio;
        return this;
    }

    public User getUser() {
        return user;
    }

    public InitializationResponse setUser(User user) {
        this.user = user;
        return this;
    }
}
