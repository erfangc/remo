package com.remo.api.security;

import com.remo.api.security.models.Security;
import com.remo.api.security.models.SecurityKey;
import org.springframework.data.repository.CrudRepository;

/**
 * Spring JPA repository for getting security data
 * Created by erfangchen on 7/15/17.
 */
public interface SecurityRepository extends CrudRepository<Security, SecurityKey> {
}
