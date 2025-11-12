package com.farmhub.farmhub.exceptions;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class FileReadException extends RuntimeException {
    public FileReadException(String message) {
        super(message);
    }
}