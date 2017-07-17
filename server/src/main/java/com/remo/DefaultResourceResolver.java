package com.remo;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.resource.ResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * A resource resolver that always return index.html
 * <p>
 * This is important for the react-router use-case where user launches a URL that should be delegated to the client instead of the server
 * for example: my.domain/authenticate
 * <p>
 * Created by erfangchen on 7/17/17.
 */
class DefaultResourceResolver implements ResourceResolver {
    @Override
    public Resource resolveResource(HttpServletRequest request, String requestPath, List<? extends Resource> locations, ResourceResolverChain chain) {
        return new ClassPathResource("static/index.html");
    }

    @Override
    public String resolveUrlPath(String resourcePath, List<? extends Resource> locations, ResourceResolverChain chain) {
        return resourcePath;
    }
}
