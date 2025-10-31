package com.farmhub.farmhub.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.farmhub.farmhub.dto.ErrorResponseDto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDto> handleValidationExceptions(MethodArgumentNotValidException ex) {
        
        Map<String, String> validationErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            validationErrors.put(error.getField(), error.getDefaultMessage());
        });

        List<Map<String, String>> errorList = new ArrayList<>();
        errorList.add(validationErrors);

        ErrorResponseDto errorResponse = new ErrorResponseDto();
        
        errorResponse.setMessage(errorList); 

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}