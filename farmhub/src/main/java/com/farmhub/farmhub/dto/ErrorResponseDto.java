package com.farmhub.farmhub.dto;

import lombok.Data;

@Data
public class ErrorResponseDto {
    String message;
    public ErrorResponseDto(String msg){
        this.message = msg;

    }
}
