package com.farmhub.farmhub.controllers;

import com.farmhub.farmhub.dto.CreateProduceDto;
import com.farmhub.farmhub.dto.ProduceResponseDto;
import com.farmhub.farmhub.models.User;
import com.farmhub.farmhub.services.ProduceService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@EnableMethodSecurity
@RequestMapping("/api/produce")
@RequiredArgsConstructor
public class ProduceControllers {

    private final ProduceService produceService;

    @PostMapping
    public ResponseEntity<ProduceResponseDto> createProduce(
            @Valid @RequestBody CreateProduceDto produceDto,
            @AuthenticationPrincipal User currentUser) {
        ProduceResponseDto newProduce = produceService.createProduce(produceDto, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(newProduce);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProduceResponseDto>> getAllProduce() {
        List<ProduceResponseDto> allProduce = produceService.getAllProduce();
        return ResponseEntity.ok(allProduce);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProduceById(
            @PathVariable UUID id) {
        System.out.println("Fetching Id: " + id);
        try {
            ProduceResponseDto product = produceService.getProduceById(id);

            return ResponseEntity.ok(product);
        } catch (EntityNotFoundException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Produce item with ID '" + id + "' not found.");

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateProduce(
            @PathVariable UUID id,
            @RequestBody Map<String, Object> updates) {
        try {
            ProduceResponseDto updatedProduce = produceService.updateProduce(id, updates);
            return ResponseEntity.ok(updatedProduce);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.MULTI_STATUS).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduce(@PathVariable UUID id,@AuthenticationPrincipal User currentUser) {
        try {
            produceService.deleteProduce(id,currentUser);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            Map<String,String> erro = new HashMap<>();

            erro.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                erro
            );

        }
    }
}
