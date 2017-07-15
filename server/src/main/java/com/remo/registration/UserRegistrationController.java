package com.remo.registration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

/**
 * {@link UserRegistrationController}
 * Created by erfangchen on 7/5/17.
 */
@RestController("registration")
public class UserRegistrationController {

    private UserDetailService detailsManager;
    private PasswordEncoder passwordEncoder;
    private Logger logger = LoggerFactory.getLogger(UserRegistrationController.class);

    @Autowired
    public UserRegistrationController(UserDetailService userDetailsManager) throws Exception {
        passwordEncoder = new StandardPasswordEncoder();
        detailsManager = userDetailsManager;
    }

    @PutMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody ImmutableUser request, BindingResult bindingResult) {
        final String encodedPassword = passwordEncoder.encode(request.getPassword());
        ImmutableUser userWithHashedPassword = ImmutableUser
                .builder()
                .from(request)
                .isEnabled(true)
                .isAccountNonExpired(true)
                .isAccountNonLocked(true)
                .isCredentialsNonExpired(true)
                .password(encodedPassword)
                .build();

        try {
            detailsManager.createUser(userWithHashedPassword);
        } catch (DuplicateKeyException e) {
            logger.error("Duplicate user registration attempted for username {}", userWithHashedPassword.getUsername());
            Map<Object, RegistrationField> validationErrors = new HashMap<>();
            validationErrors.put(
                    "username",
                    new RegistrationField()
                            .setValue(request.getUsername())
                            .setError("this username has been taken")
            );
            return new ResponseEntity<Object>(validationErrors, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(request.getUsername() + " created");
    }

}
