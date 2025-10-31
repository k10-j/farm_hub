package com.farmhub.farmhub.services;

import com.farmhub.farmhub.config.JwtUtil;
import com.farmhub.farmhub.dto.LoginRequest;
import com.farmhub.farmhub.dto.UserResponseDto;
import com.farmhub.farmhub.models.User;
import com.farmhub.farmhub.dto.AuthenticationResponse;
import com.farmhub.farmhub.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

public AuthenticationResponse login(LoginRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
    );

    var user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("User not found after authentication"));

    var jwtToken = jwtUtil.generateToken(user.getEmail());
    
    var userDto = convertToUserresponse(user); 

    return AuthenticationResponse.builder()
            .token(jwtToken)
            .user(userDto)
            .build();
}

    public static UserResponseDto convertToUserresponse(User user){
        UserResponseDto convertedUser = new UserResponseDto();
        convertedUser.setEmail(user.getEmail());
        convertedUser.setName(user.getName());
        convertedUser.setId(user.getId());
        convertedUser.setPhone(user.getPhone());
        return convertedUser;
    }
}