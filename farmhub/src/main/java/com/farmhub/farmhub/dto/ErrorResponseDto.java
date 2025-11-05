package com.farmhub.farmhub.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Map;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponseDto {

    private String error;
    private String message;
    private Map<String, String> validationErrors;

    public ErrorResponseDto(String error, String message) {
        this.error = error;
        this.message = message;
    }

    public ErrorResponseDto(String error, Map<String, String> validationErrors) {
        this.error = error;
        this.validationErrors = validationErrors;
    }
}