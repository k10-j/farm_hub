package com.farmhub.farmhub.controllers;

import com.farmhub.farmhub.dto.*;
import com.farmhub.farmhub.services.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import java.util.Map;
import org.springframework.http.ResponseCookie;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@Valid @RequestBody UserRegistrationDto newUser) {
        UserResponseDto savedUser = authenticationService.register(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PostMapping("/login")
public ResponseEntity<UserResponseDto> login(@RequestBody LoginRequest payload, HttpServletResponse response) {

    AuthenticationResponse authResponse = authenticationService.login(payload);

    // --- START OF FIX ---
    // We build the cookie as a String to include SameSite=None,
    // which is required for cross-domain requests.
// String cookieString = String.format(
//     "jwt=%s; HttpOnly; Secure; Path=/; Max-Age=3600; SameSite=None; Domain=farm-hub.onrender.com",
//     authResponse.getToken()
// );
// String cookieString = String.format(
//     "jwt=%s; HttpOnly; Secure; Path=/; Max-Age=3600; SameSite=None",
//     authResponse.getToken()
// );

    // String cookieString = String.format(
    //         "jwt=%s; HttpOnly; Secure; Path=/; Max-Age=3600; SameSite=None", 
    //         authResponse.getToken()
    // );
    ResponseCookie cookie = ResponseCookie.from("jwt", authResponse.getToken())
        .httpOnly(true)
        .secure(true)
        .sameSite("None")
        .path("/")
        .maxAge(3600)
        .build();

response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());


    // Add the cookie string directly to the response headers
    // response.addHeader(HttpHeaders.SET_COOKIE, cookieString);
    
    // --- END OF FIX ---

    return ResponseEntity.ok(authResponse.getUser());
}

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", null); 
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }
}
