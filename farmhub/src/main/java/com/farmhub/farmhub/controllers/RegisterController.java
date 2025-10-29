package com.farmhub.farmhub.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmhub.farmhub.dto.ErrorResponseDto;
import com.farmhub.farmhub.dto.UserRegistrationDto;
import com.farmhub.farmhub.dto.UserResponseDto;
import com.farmhub.farmhub.services.RegistrationService;

@RestController
@RequestMapping("/api/auth")
public class RegisterController {
     
    private final RegistrationService registrationService;
    public RegisterController(RegistrationService registrationService){
        this.registrationService = registrationService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationDto newUser){
        try {
            UserResponseDto saveduser = registrationService.register(newUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                saveduser
            );

        } catch (Exception e) {
            ErrorResponseDto errorResponse = new ErrorResponseDto(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
        }

    }

    
}
