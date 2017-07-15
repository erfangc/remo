package com.remo.api.security;

import java.io.Serializable;

/**
 * The primary key of a security
 * Created by erfangchen on 7/15/17.
 */
public class SecurityKey implements Serializable {
    private String securityID;
    private String securityIDType;

    public String getSecurityID() {
        return securityID;
    }

    public SecurityKey setSecurityID(String securityID) {
        this.securityID = securityID;
        return this;
    }

    public String getSecurityIDType() {
        return securityIDType;
    }

    public SecurityKey setSecurityIDType(String securityIDType) {
        this.securityIDType = securityIDType;
        return this;
    }
}
