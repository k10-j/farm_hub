package com.farmhub.farmhub.dto;

import com.farmhub.farmhub.enums.OrderStatus;
import lombok.Data;

@Data
public class UpdateOrderStatusDto {
    private OrderStatus status;
}