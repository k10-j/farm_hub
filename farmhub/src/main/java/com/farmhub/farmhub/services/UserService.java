package com.farmhub.farmhub.services;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.farmhub.farmhub.dto.UserResponseDto;
import com.farmhub.farmhub.models.User;
import com.farmhub.farmhub.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponseDto getData(UUID id) {
        if (!userRepository.findById(id).isPresent()) {
            throw new UsernameNotFoundException("User Not found Exception");
            
        }
        Optional<User> userinfo = userRepository.findById(id);
        return userinfo.map(this::mapToUserResponseDto).orElse(null);
    }

    public UserResponseDto updateUser(UUID id, Map<String, String> updates) {
        User userToUpdate = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));

        if (updates.containsKey("name")) {
            userToUpdate.setName(updates.get("name"));
        }
        if (updates.containsKey("phone")) {
            userToUpdate.setPhone(updates.get("phone"));
        }
        if (updates.containsKey("email")) {
            userToUpdate.setEmail(updates.get("email"));
        }

        User updatedUser = userRepository.save(userToUpdate);
        return mapToUserResponseDto(updatedUser);
    }

    public void deleteData(UUID id) {
        if (!userRepository.findById(id).isPresent()) {
            throw new UsernameNotFoundException("User Not found Exception");
        }
        userRepository.deleteById(id);

    }

    private UserResponseDto mapToUserResponseDto(User user) {
        UserResponseDto us = new UserResponseDto();
        us.setId(user.getId());
        us.setName(user.getName());
        us.setEmail(user.getEmail());
        us.setPhone(user.getPhone());
        return us;
    }
}
