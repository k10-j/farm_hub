package com.farmhub.farmhub.controllers;

import com.farmhub.farmhub.dto.EquipmentPatchDto;
import com.farmhub.farmhub.dto.EquipmentRequestDto;
import com.farmhub.farmhub.dto.EquipmentResponseDto;
import com.farmhub.farmhub.models.User;
import com.farmhub.farmhub.services.EquipmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/equipment")
@RequiredArgsConstructor
public class EquipmentController {

    private final EquipmentService equipmentService;

    @PostMapping
    public ResponseEntity<EquipmentResponseDto> createEquipment(
            @Valid @RequestBody EquipmentRequestDto dto,
            @AuthenticationPrincipal User currentUser) {
        
        EquipmentResponseDto createdEquipment = equipmentService.createEquipment(dto, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEquipment);
    }

    @GetMapping
    public ResponseEntity<List<EquipmentResponseDto>> getAllEquipment() {
        return ResponseEntity.ok(equipmentService.getAllEquipment());
    }

    @GetMapping("/my-equipment")
    public ResponseEntity<List<EquipmentResponseDto>> getMyEquipment(
            @AuthenticationPrincipal User currentUser) {
        
        return ResponseEntity.ok(equipmentService.getMyEquipment(currentUser));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EquipmentResponseDto> getEquipmentById(@PathVariable UUID id) {
        return ResponseEntity.ok(equipmentService.getEquipmentById(id));
    }

 @PatchMapping("/{id}")
    public ResponseEntity<EquipmentResponseDto> updateEquipment(
            @PathVariable UUID id,
            @Valid @RequestBody EquipmentPatchDto dto,
            @AuthenticationPrincipal User currentUser) {
        
        EquipmentResponseDto updatedEquipment = equipmentService.updateEquipment(id, dto, currentUser);
        return ResponseEntity.ok(updatedEquipment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipment(
            @PathVariable UUID id,
            @AuthenticationPrincipal User currentUser) {
        
        equipmentService.deleteEquipment(id, currentUser);
        return ResponseEntity.noContent().build();
    }
}