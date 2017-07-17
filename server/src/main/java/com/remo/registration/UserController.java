package com.remo.registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.security.Principal;

@RequestMapping("api/user")
@RestController
public class UserController {

    private UserDetailService userDetailService;

    @Autowired
    public UserController(UserDetailService userDetailService) {
        this.userDetailService = userDetailService;
    }

    @PostMapping
    public ResponseEntity<User> updateUser(@Valid @RequestBody User user, BindingResult bindingResult, Principal principal) {
        user.setUsername(principal.getName());
        userDetailService.updateUser(user);
        return ResponseEntity.ok(user);
    }

}
