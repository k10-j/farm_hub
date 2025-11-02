package com.farmhub.farmhub.controllers;

import com.farmhub.farmhub.dto.ErrorResponseDto;
import com.farmhub.farmhub.dto.UserResponseDto;
import com.farmhub.farmhub.services.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
    public ResponseEntity<?> getUser(@PathVariable UUID id) {

        try {
            UserResponseDto user = userService.getData(id);
            return ResponseEntity.status(HttpStatus.FOUND).body(
                user
            );
        } catch (UsernameNotFoundException e) {

            Map<String, String> errorDetail = new HashMap<>();
            errorDetail.put("messssage", e.getMessage());

            List<Map<String, String>> errorList = new ArrayList<>();
            errorList.add(errorDetail);
            
            ErrorResponseDto errorResponse = new ErrorResponseDto();
            errorResponse.setMessage(errorList);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                errorResponse
            );
        }
       
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable UUID id, @RequestBody Map<String, String> user) {

        try {
            UserResponseDto updatedUser = userService.updateUser(id, user);

            return ResponseEntity.status(HttpStatus.ACCEPTED).body(
                updatedUser
            );
            
        } catch (Exception e) {
            Map<String, String> errorDetail = new HashMap<>();
            errorDetail.put("messssage", e.getMessage());

            List<Map<String, String>> errorList = new ArrayList<>();
            errorList.add(errorDetail);
            
            ErrorResponseDto errorResponse = new ErrorResponseDto();
            errorResponse.setMessage(errorList);
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                errorResponse
            );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable UUID id) {
        try {
            Map<String, String> response = new HashMap<>();
            response.put("messssage","User Deleted Succes" );
            userService.deleteData(id);
            return ResponseEntity.status(HttpStatus.valueOf(200)).body(
                response
            );
        } catch (Exception e) {
             Map<String, String> response = new HashMap<>();
            response.put("messssage",e.getMessage() );
            userService.deleteData(id);
            return ResponseEntity.status(HttpStatus.valueOf(200)).body(
                response
            );
        }
        // userService.deleteData(id);
        // return ResponseEntity.noContent().build();
    }
}
