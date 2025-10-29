package com.farmhub.farmhub.services;

import com.farmhub.farmhub.dto.UserRegistrationDto;
import com.farmhub.farmhub.dto.UserResponseDto;
import com.farmhub.farmhub.models.User;
import com.farmhub.farmhub.repositories.UserRepository;

import java.math.BigDecimal;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RegistrationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; 

    public RegistrationService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponseDto register(UserRegistrationDto userRegDto) {

        if (userRepository.findByEmail(userRegDto.getEmail()).isPresent()) {
            throw new IllegalStateException("Email Already Exists");
        }

        User newUser = new User();
        newUser.setName(userRegDto.getFull_name());
        newUser.setEmail(userRegDto.getEmail());
        newUser.setPhone(userRegDto.getPhone_number());
        newUser.setLocation(userRegDto.getLocation());

        newUser.setPassword(passwordEncoder.encode(userRegDto.getPassword()));
        newUser.setRating(BigDecimal.ZERO);

        User savedUser = userRepository.save(newUser);

        return mapToUserResponseDto(savedUser);
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