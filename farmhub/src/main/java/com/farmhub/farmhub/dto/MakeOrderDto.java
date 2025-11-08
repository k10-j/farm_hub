package com.farmhub.farmhub.dto;

import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
public class MakeOrderDto {
    private UUID farmer_id;
    private List<OrderItemDto> items;
}