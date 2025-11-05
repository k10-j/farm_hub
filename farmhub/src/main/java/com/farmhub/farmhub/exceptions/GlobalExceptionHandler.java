package com.farmhub.farmhub.exceptions;

import com.farmhub.farmhub.dto.ErrorResponseDto;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

import javax.naming.AuthenticationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles javax.validation errors (e.g., @NotBlank, @Email).
     * Returns HTTP 400 Bad Request.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDto handleValidationExceptions(MethodArgumentNotValidException ex) {
        
        Map<String, String> validationErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            validationErrors.put(error.getField(), error.getDefaultMessage());
        });

        return new ErrorResponseDto("Validation Failed", validationErrors);
    }

    /**
     * Handles errors for missing data (e.g., "Order not found").
     * Returns HTTP 404 Not Found.
     */
    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponseDto handleEntityNotFound(EntityNotFoundException ex) {
        return new ErrorResponseDto("Not Found", ex.getMessage());
    }

    /**
     * Handles business logic errors (e.g., "Out of stock").
     * Returns HTTP 400 Bad Request.
     */
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseDto handleIllegalArgument(IllegalArgumentException ex) {
        return new ErrorResponseDto("Bad Request", ex.getMessage());
    }

    /**
     * Handles security errors where a user is authenticated but not authorized.
     * Returns HTTP 403 Forbidden.
     */
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorResponseDto handleAccessDenied(AccessDeniedException ex) {
        return new ErrorResponseDto("Forbidden", "You do not have permission to perform this action.");
    }

    /**
    * A generic fallback for any other unexpected errors.
    * Returns HTTP 500 Internal Server Error.
    */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponseDto handleGenericException(Exception ex) {
        // You should log the full exception here
        // ex.printStackTrace(); 
        
        return new ErrorResponseDto("Internal Server Error", "An unexpected error occurred. Please try again.");
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponseDto handleUsernameNotFound(UsernameNotFoundException ex) {
        return new ErrorResponseDto("Not Found", ex.getMessage());
    }

    @ExceptionHandler(IllegalStateException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponseDto handleIllegalState(IllegalStateException ex) {
        return new ErrorResponseDto("Conflict", ex.getMessage());
    }

    /**
     * Handles failed login attempts (bad email/password).
     * Returns HTTP 401 Unauthorized.
     */
    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponseDto handleAuthentication(AuthenticationException ex) {
        // Note: We don't return ex.getMessage() for security.
        return new ErrorResponseDto("Unauthorized", "Invalid email or password.");
    }
}