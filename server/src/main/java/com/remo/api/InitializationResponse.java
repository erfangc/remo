package com.remo.api;

import com.remo.api.portfolios.Portfolio;
import com.remo.api.trades.Trade;

import java.util.Collections;
import java.util.List;

public class InitializationResponse {

    private List<Portfolio> portfolios = Collections.emptyList();
    private int activePortfolio = 0;
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

    public int getActivePortfolio() {
        return activePortfolio;
    }

    public InitializationResponse setActivePortfolio(int activePortfolio) {
        this.activePortfolio = activePortfolio;
        return this;
    }
}
