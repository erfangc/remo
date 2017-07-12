package com.remo.api;

import com.remo.api.portfolios.Portfolio;
import com.remo.api.trades.Trade;

import java.util.Collections;
import java.util.List;

public class InitializationResponse {

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
}
