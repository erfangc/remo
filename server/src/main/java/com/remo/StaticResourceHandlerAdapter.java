package com.remo;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.PathResourceResolver;

/**
 * This custom handler adapter returns index.html from static/ always when a resoution fails
 * <p>
 * I made this class bespoke because we don't use webjars, we also want all unresolved URLs to be handled by the front-end
 * instead of the backend
 * <p>
 * because the front-end uses react-router, and the back-end would have no knowledge of which routes are available
 * Created by erfangchen on 7/17/17.
 */
@Configuration
public class StaticResourceHandlerAdapter extends WebMvcConfigurerAdapter {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        final PathResourceResolver pathResourceResolver = new PathResourceResolver();
        pathResourceResolver.setAllowedLocations(new ClassPathResource("static"));
        registry
                .addResourceHandler("/**")
                .addResourceLocations("classpath:static/")
                .resourceChain(true)
                .addResolver(pathResourceResolver)
                .addResolver(new DefaultResourceResolver());
        super.addResourceHandlers(registry);
    }

}
