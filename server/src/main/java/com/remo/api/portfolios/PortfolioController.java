package com.remo.api.portfolios;

import com.remo.api.portfolios.models.Portfolio;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

import static com.remo.api.AppControllerAdvice.validateBindingResult;
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

    public PortfolioController(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    @GetMapping
    public List<Portfolio> getAll(Principal principal) {
        return portfolioRepository.findByUsername(principal.getName());
    }

    @PutMapping
    public ResponseEntity<Portfolio> put(Principal principal,
                                         @Valid @RequestBody Portfolio portfolio,
                                         BindingResult bindingResult) {
        validateBindingResult(bindingResult);
        /*
        IMPORTANT - we override the username via principal to ensure we are saving the portfolio
        under the authenticated principal only
         */
        portfolio.setUsername(principal.getName());
        final UUID portfolioID = randomUUID();
        portfolio.setPortfolioID(portfolioID);
        portfolio
                .getCashBalances()
                .forEach(cashBalance -> cashBalance
                        .getCashBalanceID()
                        .setPortfolioID(portfolio.getPortfolioID())
                );
        Portfolio newPortfolio = portfolioRepository.save(portfolio);
        return ResponseEntity.ok(newPortfolio);
    }

    @PostMapping
    public ResponseEntity<Portfolio> update(Principal principal,
                                            @Valid @RequestBody Portfolio portfolio,
                                            BindingResult bindingResult) {
        validateBindingResult(bindingResult);
        Portfolio found = portfolioRepository.findOne(portfolio.getPortfolioID());
        final String username = principal.getName();
        if (found.getUsername().equals(username)) {
            portfolio.setUsername(username);
            Portfolio updatedPortfolio = portfolioRepository.save(portfolio);
            return ResponseEntity.ok(updatedPortfolio);
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
