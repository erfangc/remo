package com.remo.api.security;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * The primary key of a security
 * Created by erfangchen on 7/15/17.
 */
@Embeddable
public class SecurityKey implements Serializable {
    @NotEmpty
    @Column(name = "security_id")
    private String securityID;
    @NotEmpty
    @Column(name = "security_id_type")
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
