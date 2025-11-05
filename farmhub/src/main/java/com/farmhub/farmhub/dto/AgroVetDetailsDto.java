package com.farmhub.farmhub.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class AgroVetDetailsDto {
    private UUID id;
    private String specialization;
    private String licenseNumber;
    private LocalDateTime verifiedDate;
    private String productsHandled;
    private Integer responseTime;
    private UUID userId;
    private String userName;
    private String userEmail;
}