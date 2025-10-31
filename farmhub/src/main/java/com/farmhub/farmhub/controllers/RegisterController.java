package com.farmhub.farmhub.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmhub.farmhub.dto.AuthenticationResponse;
import com.farmhub.farmhub.dto.ErrorResponseDto;
import com.farmhub.farmhub.dto.LoginRequest;
import com.farmhub.farmhub.dto.UserRegistrationDto;
import com.farmhub.farmhub.dto.UserResponseDto;
import com.farmhub.farmhub.services.LoginService;
import com.farmhub.farmhub.services.RegistrationService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class RegisterController {

    private final RegistrationService registrationService;
    private final LoginService loginService;

    public RegisterController(RegistrationService registrationService, LoginService loginService) {
        this.registrationService = registrationService;
        this.loginService = loginService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationDto newUser) {
        try {
            UserResponseDto saveduser = registrationService.register(newUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    saveduser);

        } catch (Exception e) {
            ErrorResponseDto errorResponse = new ErrorResponseDto(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
        @RequestBody LoginRequest payload,
        HttpServletResponse response 
    ) {
        try {
            AuthenticationResponse authResponse = loginService.login(payload);

            Cookie jwtCookie = new Cookie("jwt", authResponse.getToken());
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(true);
            jwtCookie.setPath("/");
            jwtCookie.setMaxAge(24 * 60 * 60);

            response.addCookie(jwtCookie);

            return ResponseEntity.status(HttpStatus.OK).body(
                authResponse.getUser()
            );

        } catch (Exception e) {
            ErrorResponseDto errorResponse = new ErrorResponseDto(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                errorResponse
            );
        }
    }

}
