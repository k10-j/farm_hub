package com.farmhub.farmhub.dto;

import com.farmhub.farmhub.enums.BookingStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateBookingStatusDto {
    
    @NotNull(message = "Status is required")
    private BookingStatus status;
}