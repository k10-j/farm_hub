package com.farmhub.farmhub.dto;

import com.farmhub.farmhub.enums.AvailabilityStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class EquipmentResponseDto {

    private UUID id;
    private String name;
    private String type;
    private BigDecimal hourlyRate;
    private BigDecimal dailyRate;
    private String location;
    private AvailabilityStatus availability;
    private UserResponseDto owner;
}