package com.remo.api.portfolios;

import com.remo.validation.ValidCurrency;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;

@Embeddable
public class CashBalanceID implements Serializable {

    @Column(name = "portfolio_id")
    private UUID portfolioID;
    @ValidCurrency
    @Column
    private String currency;

    public UUID getPortfolioID() {
        return portfolioID;
    }

    public CashBalanceID setPortfolioID(UUID portfolioID) {
        this.portfolioID = portfolioID;
        return this;
    }

    public String getCurrency() {
        return currency;
    }

    public CashBalanceID setCurrency(String currency) {
        this.currency = currency;
        return this;
    }
}
