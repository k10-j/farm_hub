package com.farmhub.farmhub.dto;

import com.farmhub.farmhub.enums.AvailabilityStatus;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
public class ProduceResponseDto {
    private UUID id;
    private String name;
    private String cropType;
    private String description;
    private String unit;
    private Double quantity;
    private BigDecimal pricePerUnit;
    private String imageUrl;
    private LocalDate harvestDate;
    private AvailabilityStatus availability;
    private UserResponseDto farmer; // Use the existing UserResponseDto to avoid lazy loading
}