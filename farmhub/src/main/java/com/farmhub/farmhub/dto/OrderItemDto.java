package com.farmhub.farmhub.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class OrderItemDto {
    private UUID produce_id;
    private Integer quantity;
}