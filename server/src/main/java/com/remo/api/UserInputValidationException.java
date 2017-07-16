package com.remo.api;

import java.util.Map;

/**
 * This exception class is primary used to signal validation errors on the client side
 * Created by erfangchen on 7/16/17.
 */
public class UserInputValidationException extends RuntimeException {
    private Map<Object, String> fieldErrors;

    public Map<Object, String> getFieldErrors() {
        return fieldErrors;
    }

    public UserInputValidationException setFieldErrors(Map<Object, String> fieldErrors) {
        this.fieldErrors = fieldErrors;
        return this;
    }
}
