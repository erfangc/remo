package com.remo.api.portfolios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static java.util.UUID.randomUUID;
import static java.util.stream.Collectors.toMap;

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

    @GetMapping
    public List<Portfolio> getAll(Principal principal) {
        return portfolioRepository.findByUsername(principal.getName());
    }

    @PutMapping
    public ResponseEntity<Portfolio> put(Principal principal,
                                         @Valid @RequestBody Portfolio portfolio,
                                         BindingResult bindingResult) {
        ResponseEntity<Portfolio> validationErrors = validatePortfolio(bindingResult);
        if (validationErrors != null) return validationErrors;
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

    private ResponseEntity<Portfolio> validatePortfolio(BindingResult bindingResult) {
        final List<ObjectError> allErrors = bindingResult.getAllErrors();
        if (!allErrors.isEmpty()) {
            Map<Object, String> validationErrors = allErrors
                    .stream()
                    .filter(e -> e instanceof FieldError)
                    .collect(
                            toMap(
                                    errorObject -> ((FieldError) errorObject).getField(),
                                    DefaultMessageSourceResolvable::getDefaultMessage
                            )
                    );
            return new ResponseEntity<>(new Portfolio().setValidationErrors(validationErrors), HttpStatus.BAD_REQUEST);
        }
        return null;
    }

    @PostMapping
    public ResponseEntity<Portfolio> update(Principal principal,
                                            @RequestBody Portfolio portfolio,
                                            BindingResult bindingResult) {
        ResponseEntity<Portfolio> validationErrors = validatePortfolio(bindingResult);
        if (validationErrors != null) return validationErrors;
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
