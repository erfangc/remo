package com.remo.api.portfolios;

import com.remo.api.portfolios.models.Portfolio;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

/**
 * JPA Repository object for {@link Portfolio}
 * Created by erfangchen on 7/9/17.
 */
public interface PortfolioRepository extends CrudRepository<Portfolio, UUID> {
    List<Portfolio> findByUsername(String username);
}
