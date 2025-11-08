package com.farmhub.farmhub.dto;

import com.farmhub.farmhub.enums.AvailabilityStatus;
import jakarta.validation.constraints.DecimalMin;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class EquipmentPatchDto {

    private String name;

    private String type;

    @DecimalMin(value = "0.0", inclusive = false, message = "Hourly rate must be positive")
    private BigDecimal hourlyRate;

    @DecimalMin(value = "0.0", inclusive = false, message = "Daily rate must be positive")
    private BigDecimal dailyRate;

    private String location;

    private AvailabilityStatus availability;
}