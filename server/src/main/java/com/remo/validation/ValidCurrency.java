package com.remo.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = CurrencyValidator.class)
public @interface ValidCurrency {
    String message() default "you must choose a valid currency";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String[] value() default {};
}
