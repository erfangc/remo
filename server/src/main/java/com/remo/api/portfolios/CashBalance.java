package com.remo.api.portfolios;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.Valid;

/**
 * {@link CashBalance} Entity to represent the cash balance in a single currency in a given portfolio
 * Created by erfangchen on 7/9/17.
 */
@Entity
@Table(name = "cash_balances", schema = "remo")
public class CashBalance {

    @Valid
    @EmbeddedId
    private CashBalanceID cashBalanceID;

    /**
     * JsonIgnore is used because we do not want Jackson to run into an infinite recursion error when serializing this entity
     * through REST
     * <p>
     * insertable and updatable are set to false because we are using a compound key via EmbeddedKey
     */
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "portfolio_id", insertable = false, updatable = false)
    private Portfolio portfolio;

    @Column
    private double quantity;


    public double getQuantity() {
        return quantity;
    }

    public CashBalance setQuantity(double quantity) {
        this.quantity = quantity;
        return this;
    }

    public CashBalanceID getCashBalanceID() {
        return cashBalanceID;
    }

    public CashBalance setCashBalanceID(CashBalanceID cashBalanceID) {
        this.cashBalanceID = cashBalanceID;
        return this;
    }

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public CashBalance setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
        return this;
    }
}
