package com.remo.api.security.models;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * the entity class representing a security, we can either persist it in Postgres or Mongodb or other document data stores that can store
 * aggregates
 */
@Entity
@IdClass(SecurityKey.class)
@Table(name = "securities", schema = "remo")
public class Security {

    @Id
    @NotEmpty
    @Column(name = "security_id")
    private String securityID;
    @Id
    @NotEmpty
    @Column(name = "security_id_type")
    private String securityIDType;
    @Size(max = 10)
    @Column
    private String description;
    @NotEmpty
    private String currency;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "security")
    private List<SecurityForeignIdentifier> securityForeignIdentifiers;

    public String getSecurityID() {
        return securityID;
    }

    public Security setSecurityID(String securityID) {
        this.securityID = securityID;
        return this;
    }

    public String getSecurityIDType() {
        return securityIDType;
    }

    public Security setSecurityIDType(String securityIDType) {
        this.securityIDType = securityIDType;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Security setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getCurrency() {
        return currency;
    }

    public Security setCurrency(String currency) {
        this.currency = currency;
        return this;
    }

    public List<SecurityForeignIdentifier> getSecurityForeignIdentifiers() {
        return securityForeignIdentifiers;
    }

    public Security setSecurityForeignIdentifiers(List<SecurityForeignIdentifier> securityForeignIdentifiers) {
        this.securityForeignIdentifiers = securityForeignIdentifiers;
        return this;
    }

}
