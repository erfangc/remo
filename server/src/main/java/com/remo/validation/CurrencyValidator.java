package com.remo.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Set;

import static org.hibernate.validator.internal.util.CollectionHelper.asSet;

public class CurrencyValidator implements ConstraintValidator<ValidCurrency, String> {

    private Set<String> acceptables = asSet("USD", "JPY", "GBP", "EUR", "CHF");

    @Override
    public void initialize(ValidCurrency constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return acceptables.contains(value);
    }
}
