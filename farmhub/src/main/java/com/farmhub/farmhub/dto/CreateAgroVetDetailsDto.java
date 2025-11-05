package com.farmhub.farmhub.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class CreateAgroVetDetailsDto {
    
    @NotNull(message = "User ID is required")
    private UUID userId;
    
    private String specialization;
    
    @NotBlank(message = "License number is required")
    private String licenseNumber;
    
    private String productsHandled;
    
    private Integer responseTime;
}
