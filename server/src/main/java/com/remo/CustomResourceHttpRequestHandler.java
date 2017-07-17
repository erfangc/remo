package com.remo;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.PathResourceResolver;

/**
 * This custom handler returns index.html from statc/ always when a resoution fails
 * Created by erfangchen on 7/17/17.
 */
@Configuration
public class CustomResourceHttpRequestHandler extends WebMvcConfigurerAdapter {
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
