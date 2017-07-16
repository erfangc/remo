package com.remo.api.trades.models;

import com.remo.api.portfolios.models.Portfolio;

/**
 * The REST response we send to the client when he places a trade
 * this will include the trade that was just placed with its ID and the portfolio
 * it is associated with
 * <p>
 * We return the portfolio object because it is important to view updated cash balances etc ...
 * Created by erfangchen on 7/11/17.
 */
public class PlaceTradeResponse {
    private Trade placedTrade;
    private Portfolio updatedPortfolio;

    public Trade getPlacedTrade() {
        return placedTrade;
    }

    public PlaceTradeResponse setPlacedTrade(Trade placedTrade) {
        this.placedTrade = placedTrade;
        return this;
    }

    public Portfolio getUpdatedPortfolio() {
        return updatedPortfolio;
    }

    public PlaceTradeResponse setUpdatedPortfolio(Portfolio updatedPortfolio) {
        this.updatedPortfolio = updatedPortfolio;
        return this;
    }
}
