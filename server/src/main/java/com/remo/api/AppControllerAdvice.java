package com.remo.api;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toMap;

/**
 * this controller advice handles exceptions thrown by the App and translate them into either
 * client errors 4xx or server 5xx
 */
@ControllerAdvice
public class AppControllerAdvice extends ResponseEntityExceptionHandler {

    public static void validateBindingResult(BindingResult bindingResult) {
        final List<ObjectError> allErrors = bindingResult.getAllErrors();
        if (!allErrors.isEmpty()) {
            Map<Object, String> validationErrors = allErrors
                    .stream()
                    .filter(e -> e instanceof FieldError)
                    .collect(
                            toMap(
                                    e -> ((FieldError) e).getField(),
                                    DefaultMessageSourceResolvable::getDefaultMessage
                            )
                    );
            throw new UserInputValidationException().setFieldErrors(validationErrors);
        }
    }

    @ExceptionHandler({UserInputValidationException.class})
    public ResponseEntity<UserInputValidationResponseBody> handleBadInputException(UserInputValidationException ex, WebRequest request) {
        return new ResponseEntity<>(
                new UserInputValidationResponseBody().setFieldErrors(ex.getFieldErrors()),
                HttpStatus.BAD_REQUEST
        );
    }

}
