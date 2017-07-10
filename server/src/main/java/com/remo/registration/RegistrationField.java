package com.remo.registration;

class RegistrationField {
    private String value;
    private String error;

    public String getValue() {
        return value;
    }

    public RegistrationField setValue(String value) {
        this.value = value;
        return this;
    }

    public String getError() {
        return error;
    }

    public RegistrationField setError(String error) {
        this.error = error;
        return this;
    }
}
