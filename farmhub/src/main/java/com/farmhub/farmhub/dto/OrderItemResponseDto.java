package com.farmhub.farmhub.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
public class OrderItemResponseDto {
    private UUID produceId;
    private String produceName;
    private Integer quantity;
    private BigDecimal pricePerUnit;
}