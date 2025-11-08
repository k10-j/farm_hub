package com.farmhub.farmhub.dto;

import lombok.Data;

@Data
public class UpdateAgroVetDetailsDto {
    private String specialization;
    private String licenseNumber;
    private String productsHandled;
    private Integer responseTime;
}