package com.remo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import javax.sql.DataSource;

@SpringBootApplication
@EnableWebSecurity
public class UserServiceApplication {

    @Value("#{environment['RDS_HOSTNAME']}")
    private String hostname;
    @Value("#{environment['RDS_PORT']}")
    private String port;
    @Value("#{environment['RDS_DB_NAME']}")
    private String dbname;
    @Value("#{environment['RDS_USERNAME']}")
    private String username;
    @Value("#{environment['RDS_PASSWORD']}")
    private String password;

    @Bean
    public DataSource dataSource() {
        final String url = "jdbc:postgresql://" + hostname + ":" + port + "/" + dbname;
        return new DriverManagerDataSource(url, username, password);
    }

    @Bean
    public NamedParameterJdbcTemplate namedParameterJdbcTemplate(DataSource dataSource) {
        return new NamedParameterJdbcTemplate(dataSource);
    }

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
