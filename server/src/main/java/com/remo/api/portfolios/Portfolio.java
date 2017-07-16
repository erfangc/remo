package com.remo.api.portfolios;

import com.remo.validation.ValidCurrency;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "portfolios", schema = "remo")
public class Portfolio {

    @Id
    @Column(name = "portfolio_id")
    private UUID portfolioID;
    @NotEmpty
    @Size(max = 255)
    @Column(name = "portfolio_name")
    private String portfolioName;
    @Column
    private String username;
    @Column
    @NotEmpty
    @ValidCurrency
    private String currency;
    @Column
    @Size(max = 255)
    private String description;

    @OneToMany(mappedBy = "portfolio", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Valid
    @NotEmpty
    private List<CashBalance> cashBalances;

    public String getPortfolioName() {
        return portfolioName;
    }

    public Portfolio setPortfolioName(String portfolioName) {
        this.portfolioName = portfolioName;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public Portfolio setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getCurrency() {
        return currency;
    }

    public Portfolio setCurrency(String currency) {
        this.currency = currency;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Portfolio setDescription(String description) {
        this.description = description;
        return this;
    }

    public UUID getPortfolioID() {
        return portfolioID;
    }

    public Portfolio setPortfolioID(UUID portfolioID) {
        this.portfolioID = portfolioID;
        return this;
    }

    public List<CashBalance> getCashBalances() {
        return cashBalances;
    }

    public Portfolio setCashBalances(List<CashBalance> cashBalances) {
        this.cashBalances = cashBalances;
        return this;
    }

}
