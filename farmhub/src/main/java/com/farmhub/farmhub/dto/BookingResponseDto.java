package com.farmhub.farmhub.dto;

import com.farmhub.farmhub.enums.BookingStatus;
import com.farmhub.farmhub.enums.PaymentStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class BookingResponseDto {
    private UUID bookingId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private BigDecimal totalPrice;
    private BookingStatus status;
    private PaymentStatus paymentStatus;

    private EquipmentResponseDto equipment;
    private UserResponseDto farmer;
    private UserResponseDto owner; 
}