package com.remo.security;

import com.remo.registration.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

/**
 * {@link WebSecurityConfig} configures Spring Security authentication Beans and Http authorization configurations
 * Here we autowire our custom {@link UserDetailService}
 * Created by erfangchen on 7/5/17.
 */
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {


    @Autowired
    private UserDetailService userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        final DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(new StandardPasswordEncoder());
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        /*
        it is important to set the default userDetailsService on AuthenticationManagerBuilder
         */
        auth.authenticationProvider(daoAuthenticationProvider).userDetailsService(userDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        org.springframework.security.web.authentication.AuthenticationSuccessHandler authenticationSuccessHandler = new AuthenticationSuccessHandler();
        http
                .csrf()
                .disable()
                .exceptionHandling()
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                .and()
                .authorizeRequests()
                .antMatchers("/index.html").permitAll()
                .antMatchers("/api/security/**")
                .hasAuthority("ADMIN")
                .antMatchers("/api/portfolios/**", "/api/trades/**", "/api/user/**", "/api/init")
                .authenticated()
                .and()
                .formLogin()
                .successHandler(authenticationSuccessHandler)
                .failureHandler(new SimpleUrlAuthenticationFailureHandler())
                .and()
                .rememberMe()
                .and()
                .logout()
                .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK));
    }
}
