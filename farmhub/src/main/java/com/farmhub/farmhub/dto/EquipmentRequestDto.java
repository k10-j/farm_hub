package com.farmhub.farmhub.dto;

import com.farmhub.farmhub.enums.AvailabilityStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class EquipmentRequestDto {

    @NotBlank(message = "Equipment name is required")
    private String name;

    @NotBlank(message = "Equipment type is required (e.g., Tractor, Harvester)")
    private String type;

    @DecimalMin(value = "0.0", inclusive = false, message = "Hourly rate must be positive")
    private BigDecimal hourlyRate;

    @DecimalMin(value = "0.0", inclusive = false, message = "Daily rate must be positive")
    private BigDecimal dailyRate;

    private String location;

    @NotNull(message = "Availability status is required")
    private AvailabilityStatus availability;
}