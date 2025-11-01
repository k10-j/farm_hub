package com.farmhub.farmhub.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.farmhub.farmhub.enums.AvailabilityStatus;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class CreateProduceDto {
    private String cropType,name;
    private String description;
    private String unit;
    private Double quantity;
    private BigDecimal pricePerUnit;
    private String imageUrl;
    private AvailabilityStatus availability;
    private LocalDate harvestDate;



}
