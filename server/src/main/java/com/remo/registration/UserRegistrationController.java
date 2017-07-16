package com.remo.registration;

import com.remo.api.UserInputValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static java.util.Collections.singletonMap;

/**
 * {@link UserRegistrationController}
 * Created by erfangchen on 7/5/17.
 */
@RestController("registration")
public class UserRegistrationController {

    private UserDetailService detailsManager;
    private PasswordEncoder passwordEncoder;
    private Logger logger = LoggerFactory.getLogger(UserRegistrationController.class);

    public UserRegistrationController(UserDetailService userDetailsManager) throws Exception {
        passwordEncoder = new StandardPasswordEncoder();
        detailsManager = userDetailsManager;
    }

    @PutMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody User request, BindingResult bindingResult) {
        final String encodedPassword = passwordEncoder.encode(request.getPassword());
        request.setPassword(encodedPassword);
        try {
            detailsManager.createUser(request);
        } catch (DuplicateKeyException e) {
            logger.error("Duplicate user registration attempted for username {}", request.getUsername());
            throw new UserInputValidationException().setFieldErrors(singletonMap("username", "duplicate username found"));
        }
        return ResponseEntity.ok(request.getUsername() + " created");
    }

}
