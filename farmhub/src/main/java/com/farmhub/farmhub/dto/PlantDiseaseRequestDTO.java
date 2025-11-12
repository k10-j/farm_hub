package com.farmhub.farmhub.dto;

import jakarta.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlantDiseaseRequestDTO {

    @NotNull(message = "Image file is required")
    private MultipartFile image;

    private boolean similarImages = true;
}

