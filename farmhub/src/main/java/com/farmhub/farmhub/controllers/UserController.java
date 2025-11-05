package com.farmhub.farmhub.controllers;

import com.farmhub.farmhub.dto.UserResponseDto;
import com.farmhub.farmhub.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable UUID id) {
        UserResponseDto user = userService.getData(id);
        return ResponseEntity.ok(user);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable UUID id, @RequestBody Map<String, String> user) {

        UserResponseDto updatedUser = userService.updateUser(id, user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable UUID id) {

        userService.deleteData(id);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User Deleted Successfully");
        return ResponseEntity.ok(response);
    }
}