package com.farmhub.farmhub.controllers;

import com.farmhub.farmhub.dto.BookingRequestDto;
import com.farmhub.farmhub.dto.BookingResponseDto;
import com.farmhub.farmhub.dto.UpdateBookingStatusDto;
import com.farmhub.farmhub.models.User;
import com.farmhub.farmhub.services.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponseDto> createBooking(
            @Valid @RequestBody BookingRequestDto dto,
            @AuthenticationPrincipal User currentUser) {
        
        BookingResponseDto createdBooking = bookingService.createBooking(dto, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBooking);
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<BookingResponseDto>> getMyBookings(
            @AuthenticationPrincipal User currentUser) {
        
        return ResponseEntity.ok(bookingService.getMyBookings(currentUser));
    }

    @GetMapping("/my-equipment-bookings")
    public ResponseEntity<List<BookingResponseDto>> getMyEquipmentBookings(
            @AuthenticationPrincipal User currentUser) {
        
        return ResponseEntity.ok(bookingService.getMyEquipmentBookings(currentUser));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponseDto> getBookingById(
            @PathVariable UUID id,
            @AuthenticationPrincipal User currentUser) {
        
        return ResponseEntity.ok(bookingService.getBookingById(id, currentUser));
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<BookingResponseDto> updateBookingStatus(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateBookingStatusDto dto,
            @AuthenticationPrincipal User currentUser) {
        
        BookingResponseDto updatedBooking = bookingService.updateBookingStatus(id, dto, currentUser);
        return ResponseEntity.ok(updatedBooking);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelBooking(
            @PathVariable UUID id,
            @AuthenticationPrincipal User currentUser) {
        
        bookingService.cancelBooking(id, currentUser);
        return ResponseEntity.noContent().build();
    }
}