package com.farmhub.farmhub.controllers;

import com.farmhub.farmhub.dto.*;
import com.farmhub.farmhub.services.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authenticationService;


    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegistrationDto newUser) {
        try {
            UserResponseDto savedUser = authenticationService.register(newUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (IllegalStateException e) {
            Map<String, String> errorDetail = new HashMap<>();
            errorDetail.put("message", e.getMessage());

            List<Map<String, String>> errorList = new ArrayList<>();
            errorList.add(errorDetail);
            
            ErrorResponseDto errorResponse = new ErrorResponseDto();
            errorResponse.setMessage(errorList);
            
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest payload, HttpServletResponse response) {
        try {
            AuthenticationResponse authResponse = authenticationService.login(payload);

            Cookie jwtCookie = new Cookie("jwt", authResponse.getToken());
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(true);
            jwtCookie.setPath("/");
            jwtCookie.setMaxAge(24 * 60 * 60);

            response.addCookie(jwtCookie);
            return ResponseEntity.ok(authResponse.getUser());

        } catch (AuthenticationException e) {
            Map<String, String> errorDetail = new HashMap<>();
            errorDetail.put("message", "Invalid email or password.");

            List<Map<String, String>> errorList = new ArrayList<>();
            errorList.add(errorDetail);

            ErrorResponseDto errorResponse = new ErrorResponseDto();
            errorResponse.setMessage(errorList); 

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", null); 
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        response.addCookie(cookie);

        return ResponseEntity.status(HttpStatus.valueOf(200)).body("Logout successful");
    }
}