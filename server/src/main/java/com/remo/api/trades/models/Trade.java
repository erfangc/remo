package com.remo.api.trades.models;

import com.remo.validation.ValidCurrency;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.UUID;

/**
 * Entity class for a {@link Trade}
 * Created by erfangchen on 7/9/17.
 */
@Entity
@Table(name = "trades", schema = "remo")
public class Trade {

    @Id
    @Column(name = "trade_id")
    private UUID tradeID;
    @Column(name = "portfolio_id")
    private UUID portfolioID;

    @NotEmpty
    @Column(name = "security_id")
    private String securityID;

    @NotEmpty
    @Column(name = "security_id_type")
    private String securityIDType;

    @Column(name = "trade_time")
    private Date tradeTime;

    @Column(name = "accrued_interest")
    private double accruedInterest = 0;

    @NotNull
    @Column
    private double price;

    @ValidCurrency
    @Column
    private String currency;

    @Column
    private double commission = 0;

    @NotNull
    @Column
    private double quantity;

    @Column
    @Size(max = 255)
    private String description = "";

    public double getPrice() {
        return price;
    }

    public Trade setPrice(double price) {
        this.price = price;
        return this;
    }

    public double getAccruedInterest() {
        return accruedInterest;
    }

    public Trade setAccruedInterest(double accruedInterest) {
        this.accruedInterest = accruedInterest;
        return this;
    }

    public String getCurrency() {
        return currency;
    }

    public Trade setCurrency(String currency) {
        this.currency = currency;
        return this;
    }

    public double getCommission() {
        return commission;
    }

    public Trade setCommission(double commission) {
        this.commission = commission;
        return this;
    }

    public UUID getPortfolioID() {
        return portfolioID;
    }

    public Trade setPortfolioID(UUID portfolioID) {
        this.portfolioID = portfolioID;
        return this;
    }

    public UUID getTradeID() {
        return tradeID;
    }

    public Trade setTradeID(UUID tradeID) {
        this.tradeID = tradeID;
        return this;
    }

    public String getSecurityID() {
        return securityID;
    }

    public Trade setSecurityID(String securityID) {
        this.securityID = securityID;
        return this;
    }

    public String getSecurityIDType() {
        return securityIDType;
    }

    public Trade setSecurityIDType(String securityIDType) {
        this.securityIDType = securityIDType;
        return this;
    }

    public Date getTradeTime() {
        return tradeTime;
    }

    public Trade setTradeTime(Date tradeTime) {
        this.tradeTime = tradeTime;
        return this;
    }

    public double getQuantity() {
        return quantity;
    }

    public Trade setQuantity(double quantity) {
        this.quantity = quantity;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Trade setDescription(String description) {
        this.description = description;
        return this;
    }

}
