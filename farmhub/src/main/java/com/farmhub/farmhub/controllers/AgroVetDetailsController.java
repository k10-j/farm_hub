package com.farmhub.farmhub.controllers;

import com.farmhub.farmhub.dto.AgroVetDetailsDto;
import com.farmhub.farmhub.dto.CreateAgroVetDetailsDto;
import com.farmhub.farmhub.dto.UpdateAgroVetDetailsDto;
import com.farmhub.farmhub.services.AgroVetDetailsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/agrovet-details")
@RequiredArgsConstructor
public class AgroVetDetailsController {

    private final AgroVetDetailsService agroVetDetailsService;

    @PostMapping
    public ResponseEntity<AgroVetDetailsDto> createAgroVetDetails(
            @Valid @RequestBody CreateAgroVetDetailsDto dto) {
        AgroVetDetailsDto created = agroVetDetailsService.createAgroVetDetails(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AgroVetDetailsDto> getAgroVetDetailsById(@PathVariable UUID id) {
        AgroVetDetailsDto agroVetDetails = agroVetDetailsService.getAgroVetDetailsById(id);
        return ResponseEntity.ok(agroVetDetails);
    }

    @GetMapping
    public ResponseEntity<List<AgroVetDetailsDto>> getAllAgroVetDetails() {
        List<AgroVetDetailsDto> agroVetDetailsList = agroVetDetailsService.getAllAgroVetDetails();
        return ResponseEntity.ok(agroVetDetailsList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AgroVetDetailsDto> updateAgroVetDetails(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateAgroVetDetailsDto dto) {
        AgroVetDetailsDto updated = agroVetDetailsService.updateAgroVetDetails(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgroVetDetails(@PathVariable UUID id) {
        agroVetDetailsService.deleteAgroVetDetails(id);
        return ResponseEntity.noContent().build();
    }
}