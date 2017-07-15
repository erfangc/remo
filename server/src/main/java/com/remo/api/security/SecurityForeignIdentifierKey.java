package com.remo.api.security;

import java.io.Serializable;

public class SecurityForeignIdentifierKey implements Serializable {

    private String vendor;
    private String securityID;
    private String securityIDType;

    public String getSecurityID() {
        return securityID;
    }

    public SecurityForeignIdentifierKey setSecurityID(String securityID) {
        this.securityID = securityID;
        return this;
    }

    public String getSecurityIDType() {
        return securityIDType;
    }

    public SecurityForeignIdentifierKey setSecurityIDType(String securityIDType) {
        this.securityIDType = securityIDType;
        return this;
    }

    public String getVendor() {
        return vendor;
    }

    public SecurityForeignIdentifierKey setVendor(String vendor) {
        this.vendor = vendor;
        return this;
    }
}
