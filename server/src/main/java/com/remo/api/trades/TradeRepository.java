package com.remo.api.trades;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

/**
 * {@link TradeRepository}
 * Created by erfangchen on 7/9/17.
 */
public interface TradeRepository extends CrudRepository<Trade, UUID> {
    List<Trade> findByPortfolioID(UUID portfolioID);
}
