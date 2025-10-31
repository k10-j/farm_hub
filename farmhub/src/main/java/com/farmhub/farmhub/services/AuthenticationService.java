package com.farmhub.farmhub.services;

import com.farmhub.farmhub.config.JwtUtil;
import com.farmhub.farmhub.dto.AuthenticationResponse;
import com.farmhub.farmhub.dto.LoginRequest;
import com.farmhub.farmhub.dto.UserRegistrationDto;
import com.farmhub.farmhub.dto.UserResponseDto;
import com.farmhub.farmhub.models.User;
import com.farmhub.farmhub.enums.Role;
import com.farmhub.farmhub.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;


    @Transactional
    public UserResponseDto register(UserRegistrationDto userRegDto) {
        if (userRepository.findByEmail(userRegDto.getEmail()).isPresent()) {
            throw new IllegalStateException("An account with this email already exists.");
        }

        User newUser = new User();
        newUser.setName(userRegDto.getFull_name());
        newUser.setEmail(userRegDto.getEmail());
        newUser.setPhone(userRegDto.getPhone_number());
        newUser.setLocation(userRegDto.getLocation());
        newUser.setPassword(passwordEncoder.encode(userRegDto.getPassword()));
        
        newUser.setRole(Role.USER); 
        newUser.setRating(BigDecimal.ZERO);

        User savedUser = userRepository.save(newUser);

        return mapToUserResponseDto(savedUser);
    }


    public AuthenticationResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found after authentication"));

        var jwtToken = jwtUtil.generateToken(user.getEmail()); 
        
        var userDto = mapToUserResponseDto(user); 

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .user(userDto)
                .build();
    }


    private UserResponseDto mapToUserResponseDto(User user) {
        UserResponseDto responseDto = new UserResponseDto();
        responseDto.setId(user.getId());
        responseDto.setName(user.getName());
        responseDto.setEmail(user.getEmail());
        responseDto.setPhone(user.getPhone());
        return responseDto;
    }
}