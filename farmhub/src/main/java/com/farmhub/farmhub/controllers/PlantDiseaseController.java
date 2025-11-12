package com.farmhub.farmhub.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import com.farmhub.farmhub.dto.PlantDiseaseRequestDTO;
import com.farmhub.farmhub.dto.PlantDiseaseResponseDTO;
import com.farmhub.farmhub.services.PlantDiseaseDetectionService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/detect-disease")
@RequiredArgsConstructor
public class PlantDiseaseController {

    private final PlantDiseaseDetectionService detectionService;

    @PostMapping
    public ResponseEntity<PlantDiseaseResponseDTO> detectPlantDisease(
            @Valid @ModelAttribute PlantDiseaseRequestDTO dto
    ) {
        log.info("Received disease detection request...");
        
        PlantDiseaseResponseDTO result = detectionService.detectDisease(
                dto.getImage(), 
                dto.isSimilarImages()
        );
        
        return ResponseEntity.ok(result);
    }
}