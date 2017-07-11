package com.remo.api.portfolios;

import java.util.List;

public class InitializationResponse {
    private List<Portfolio> portfolios;

    public List<Portfolio> getPortfolios() {
        return portfolios;
    }

    public InitializationResponse setPortfolios(List<Portfolio> portfolios) {
        this.portfolios = portfolios;
        return this;
    }
}
