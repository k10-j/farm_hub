package com.farmhub.farmhub.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import com.farmhub.farmhub.enums.OrderStatus;
import com.farmhub.farmhub.enums.PaymentStatus;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MakeOrderResponseDto {
    private UUID id;
    private BigDecimal totalPrice;
    private OrderStatus status;
    private PaymentStatus paymentStatus;
    
    private UserResponseDto buyer;
    private UserResponseDto farmer;
    
    private List<OrderItemResponseDto> items;
}