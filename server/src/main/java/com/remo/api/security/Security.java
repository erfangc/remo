package com.remo.api.security;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * the entity class representing a security, we can either persist it in Postgres or Mongodb or other document data stores that can store
 * aggregates
 */
@Entity
@Table(name = "securities", schema = "remo")
public class Security {

    @EmbeddedId
    private SecurityKey securityKey;
    @Size(max = 10)
    @Column
    private String description;
    @NotEmpty
    private String currency;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "security")
    private List<SecurityForeignIdentifier> securityForeignIdentifiers;

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

    public SecurityKey getSecurityKey() {
        return securityKey;
    }

    public Security setSecurityKey(SecurityKey securityKey) {
        this.securityKey = securityKey;
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
