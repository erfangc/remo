package com.remo.api;

import java.util.Map;

/**
 * This is the Http response body that corresponds to the program exception {@link UserInputValidationException}
 * Created by erfangchen on 7/16/17.
 */
public class UserInputValidationResponseBody {
    private Map<Object, String> fieldErrors;

    public Map<Object, String> getFieldErrors() {
        return fieldErrors;
    }

    public UserInputValidationResponseBody setFieldErrors(Map<Object, String> fieldErrors) {
        this.fieldErrors = fieldErrors;
        return this;
    }
}
