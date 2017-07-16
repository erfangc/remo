package com.remo.registration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

/**
 * This is a custom implementation of the Spring security {@link UserDetailsService} used for authentication
 * and authorization
 * <p/>
 * This bean is also used for retrieve user details in the App itself and stores use preferences
 * <p>
 * Created by erfangchen on 7/8/17.
 */
@Service
public class UserDetailService implements UserDetailsService {

    private JdbcTemplate jdbcTemplate;
    private Logger logger = LoggerFactory.getLogger(UserDetailService.class);

    @Autowired
    public UserDetailService(JdbcTemplate jdbcTemplate) throws IOException {
        this.jdbcTemplate = jdbcTemplate;
        /*
         create the database tables necessary to hold user information
         used upon first time setup of the App
         */
        if (System.getProperties().containsKey("initializeUserDatabase")
                && System.getProperties().containsKey("dropExistingUserTables")) {
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(new ClassPathResource("schema-postgre.sql").getInputStream())
            );
            String script = reader.lines().collect(joining("\n"));
            /*
            create the user database schema via JDBC template
             */
            logger.info("Creating user database schema");
            jdbcTemplate.execute(script);
            reader.close();
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("Querying user detail for {}", username);
        User user;
        try {
            user = jdbcTemplate
                    .queryForObject(
                            "SELECT * FROM remo.users WHERE username = ?",
                            new Object[]{username},
                            (rs, rowNum) -> new User()
                                    .setFirstName(rs.getString("first_name"))
                                    .setLastName(rs.getString("last_name"))
                                    .setUsername(rs.getString("username"))
                                    .setPassword(rs.getString("password"))
                                    .setEmail(rs.getString("email"))
                                    .setOccupation(rs.getString("occupation"))
                                    .setGrantedAuthorities(new ArrayList<>())
                    );
        } catch (EmptyResultDataAccessException exception) {
            logger.error(exception.getMessage());
            String message = "Cannot find user info for " + username;
            logger.error(message);
            throw new UsernameNotFoundException(message);
        }
        List<Map<String, Object>> authorities = jdbcTemplate.queryForList(
                "SELECT * FROM remo.authorities WHERE username = ?",
                new Object[]{username}
        );
        logger.info("{} has the following authorities {}", username, authorities);
        return user
                .setGrantedAuthorities(
                        authorities
                                .stream()
                                .map(row -> new SimpleGrantedAuthority((String) row.get("authority")))
                                .collect(toList())
                );
    }

    public void updateUser(User user) {
        final String INSERT_SQL =
                "UPDATE remo.users SET first_name = ?, last_name = ?, occupation = ?, email = ? WHERE username = ?";
        jdbcTemplate.update(
                INSERT_SQL,
                user.getFirstName(),
                user.getLastName(),
                user.getOccupation(),
                user.getEmail(),
                user.getUsername()
        );
    }

    public void createUser(User user) {
        final String INSERT_SQL =
                "INSERT INTO remo.users (first_name, last_name, username, password, occupation, email, enabled) VALUES (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(INSERT_SQL,
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getPassword(),
                user.getOccupation(),
                user.getEmail(),
                user.isEnabled()
        );
    }

}
