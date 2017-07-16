package com.remo.api.security.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * This represents the mapping from the native security identifier in the server to an external system.
 * For example, Quandl, Zack's etc ...
 * <p>
 * This is generally useful even for proprietary data sources as different vendors of security data generally will
 * use different identifier schemes
 * <p>
 * Created by erfangchen on 7/15/17.
 */
@Entity
@Table(name = "security_foreign_identifiers", schema = "remo")
@IdClass(SecurityForeignIdentifierKey.class)
public class SecurityForeignIdentifier {

    @Id
    @Column
    private String vendor;
    @Column(name = "security_id")
    @Id
    private String securityID;
    @Id
    @Column(name = "security_id_type")
    private String securityIDType;

    @Column(name = "vendor_identifier")
    private String vendorIdentifier;

    @JsonIgnore
    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "security_id", insertable = false, updatable = false),
            @JoinColumn(name = "security_id_type", insertable = false, updatable = false)
    })
    private Security security;

    public String getVendor() {
        return vendor;
    }

    public SecurityForeignIdentifier setVendor(String vendor) {
        this.vendor = vendor;
        return this;
    }

    public String getSecurityID() {
        return securityID;
    }

    public SecurityForeignIdentifier setSecurityID(String securityID) {
        this.securityID = securityID;
        return this;
    }

    public String getSecurityIDType() {
        return securityIDType;
    }

    public SecurityForeignIdentifier setSecurityIDType(String securityIDType) {
        this.securityIDType = securityIDType;
        return this;
    }

    public String getVendorIdentifier() {
        return vendorIdentifier;
    }

    public SecurityForeignIdentifier setVendorIdentifier(String vendorIdentifier) {
        this.vendorIdentifier = vendorIdentifier;
        return this;
    }

    public Security getSecurity() {
        return security;
    }

    public SecurityForeignIdentifier setSecurity(Security security) {
        this.security = security;
        return this;
    }
}
