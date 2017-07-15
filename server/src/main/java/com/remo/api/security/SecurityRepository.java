package com.remo.api.security;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Spring JPA repository for getting security data
 * Created by erfangchen on 7/15/17.
 */
public interface SecurityRepository extends CrudRepository<Security, SecurityKey> {
    List<Security> findBySecurityKey(SecurityKey securityKey);

    Security deleteBySecurityKey(SecurityKey securityKey);
}
