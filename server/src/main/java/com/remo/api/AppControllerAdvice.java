package com.remo.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class AppControllerAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler({UserInputValidationException.class})
    public ResponseEntity<UserInputValidationResponseBody> handleBadInputException(UserInputValidationException ex, WebRequest request) {
        return new ResponseEntity<>(
                new UserInputValidationResponseBody().setFieldErrors(ex.getFieldErrors()),
                HttpStatus.BAD_REQUEST
        );
    }

}
