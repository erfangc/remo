package com.remo.api.portfolios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

import static java.util.UUID.randomUUID;

/**
 * This controls the creation of portfolios on the platform
 * <p>
 * Created by erfangchen on 7/8/17.
 */
@RestController
@RequestMapping("api/portfolios")
public class PortfolioController {
    private PortfolioRepository portfolioRepository;

    @Autowired
    public PortfolioController(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    @GetMapping("initialize")
    public ResponseEntity<InitializationResponse> initialze(Principal principal) {
        List<Portfolio> portfolios = getAll(principal);
        return ResponseEntity.ok(new InitializationResponse().setPortfolios(portfolios));
    }

    @GetMapping
    public List<Portfolio> getAll(Principal principal) {
        return portfolioRepository.findByUsername(principal.getName());
    }

    @PutMapping
    public ResponseEntity<?> put(Principal principal,
                                 @RequestBody Portfolio portfolio) {
        /*
        IMPORTANT - we override the username via principal to ensure we are saving the portfolio
        under the authenticated principal only
         */
        portfolio.setUsername(principal.getName());
        final UUID portfolioID = randomUUID();
        portfolio.setPortfolioID(portfolioID);
        portfolio
                .getCashBalances()
                .forEach(cb -> cb
                        .getCashBalanceID()
                        .setPortfolioID(portfolio.getPortfolioID())
                );
        portfolioRepository.save(portfolio);
        return ResponseEntity.ok("created");
    }

    @PostMapping
    public ResponseEntity<?> update(Principal principal,
                                    @RequestBody Portfolio portfolio) {
        Portfolio found = portfolioRepository.findOne(portfolio.getPortfolioID());
        final String username = principal.getName();
        if (found.getUsername().equals(username)) {
            portfolio.setUsername(username);
            portfolioRepository.save(portfolio);
            return ResponseEntity.ok("updated");
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @DeleteMapping
    @RequestMapping("{portfolioID}")
    public ResponseEntity<?> delete(Principal principal, @PathVariable UUID portfolioID) {
        Portfolio found = portfolioRepository.findOne(portfolioID);
        final String username = principal.getName();
        if (found.getUsername().equals(username)) {
            portfolioRepository.delete(portfolioID);
            return ResponseEntity.ok("deleted");
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

}
