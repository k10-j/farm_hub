package com.farmhub.farmhub.services;

import com.farmhub.farmhub.dto.*;
import com.farmhub.farmhub.enums.AvailabilityStatus;
import com.farmhub.farmhub.enums.BookingStatus;
import com.farmhub.farmhub.enums.PaymentStatus;
import com.farmhub.farmhub.models.Booking;
import com.farmhub.farmhub.models.Equipment;
import com.farmhub.farmhub.models.User;
import com.farmhub.farmhub.repositories.BookingRepository;
import com.farmhub.farmhub.repositories.EquipmentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EquipmentRepository equipmentRepository;

    @Transactional
    public BookingResponseDto createBooking(BookingRequestDto dto, User farmer) {
        if (dto.getStartDate().isAfter(dto.getEndDate()) || dto.getStartDate().isEqual(dto.getEndDate())) {
            throw new IllegalArgumentException("Booking start date must be before the end date.");
        }

        Equipment equipment = equipmentRepository.findByIdWithDetails(dto.getEquipmentId())
                .orElseThrow(() -> new EntityNotFoundException("Equipment not found with ID: " + dto.getEquipmentId()));

        if (equipment.getAvailability() != AvailabilityStatus.AVAILABLE) {
            throw new IllegalArgumentException("Equipment is not available for booking.");
        }
        
        if (equipment.getOwner().getId().equals(farmer.getId())) {
             throw new IllegalArgumentException("You cannot book your own equipment.");
        }

        List<Booking> conflicts = bookingRepository.findOverlappingBookings(
                dto.getEquipmentId(), dto.getStartDate(), dto.getEndDate());
        
        if (!conflicts.isEmpty()) {
            throw new IllegalArgumentException("This equipment is already booked for the selected time slot.");
        }

        BigDecimal totalPrice = calculatePrice(equipment, dto.getStartDate(), dto.getEndDate());

        Booking booking = new Booking();
        booking.setEquipment(equipment);
        booking.setFarmer(farmer);
        booking.setOwner(equipment.getOwner()); 
        booking.setStartDate(dto.getStartDate());
        booking.setEndDate(dto.getEndDate());
        booking.setTotalPrice(totalPrice);
        booking.setStatus(BookingStatus.REQUESTED); 
        booking.setPaymentStatus(PaymentStatus.PENDING);

        Booking savedBooking = bookingRepository.save(booking);
        return convertToResponseDto(savedBooking);
    }

    // --- READ (Get All for Renter) ---
    @Transactional(readOnly = true)
    public List<BookingResponseDto> getMyBookings(User farmer) {
        return bookingRepository.findByFarmerWithDetails(farmer).stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    // --- READ (Get All for Owner) ---
    @Transactional(readOnly = true)
    public List<BookingResponseDto> getMyEquipmentBookings(User owner) {
        return bookingRepository.findByOwnerWithDetails(owner).stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public BookingResponseDto getBookingById(UUID id, User currentUser) {
        Booking booking = bookingRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with ID: " + id));

        if (!booking.getFarmer().getId().equals(currentUser.getId()) && !booking.getOwner().getId().equals(currentUser.getId())) {
            throw new EntityNotFoundException("Booking not found with ID: " + id);
        }
        
        return convertToResponseDto(booking);
    }
    
    @Transactional
    public BookingResponseDto updateBookingStatus(UUID id, UpdateBookingStatusDto dto, User owner) {
        Booking booking = bookingRepository.findByBookingIdAndOwner(id, owner)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found or you are not the owner."));

        if (booking.getStatus() == BookingStatus.CANCELLED) {
             throw new IllegalArgumentException("Cannot update a cancelled booking.");
        }
        
        if (dto.getStatus() == BookingStatus.REJECTED) {
            booking.setStatus(BookingStatus.REJECTED);
        }
        
        if (dto.getStatus() == BookingStatus.CONFIRMED) {
            List<Booking> conflicts = bookingRepository.findOverlappingBookings(
                booking.getEquipment().getId(), booking.getStartDate(), booking.getEndDate());
            
            if (!conflicts.isEmpty()) {
                throw new IllegalArgumentException("Cannot confirm booking, a conflict exists.");
            }
            booking.setStatus(BookingStatus.CONFIRMED);
        }
        
        Booking savedBooking = bookingRepository.save(booking);
        return convertToResponseDto(savedBooking);
    }
    
    @Transactional
    public void cancelBooking(UUID id, User farmer) {
         Booking booking = bookingRepository.findByBookingIdAndFarmer(id, farmer)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found or you are not the renter."));

        if (booking.getStatus() != BookingStatus.APPROVED && booking.getStatus() != BookingStatus.CONFIRMED) {
            throw new IllegalArgumentException("Cannot cancel a booking that is already " + booking.getStatus());
        }
        
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }


    // --- Helper Methods ---

    private BigDecimal calculatePrice(Equipment equipment, LocalDateTime start, LocalDateTime end) {
        long durationHours = Duration.between(start, end).toHours();
        
        if (durationHours <= 0) {
            throw new IllegalArgumentException("Booking duration must be at least 1 hour.");
        }

        BigDecimal rate;
        if (durationHours >= 24 && equipment.getDailyRate() != null) {
            long days = (durationHours + 23) / 24;
            rate = equipment.getDailyRate().multiply(BigDecimal.valueOf(days));
        } else {
            rate = equipment.getHourlyRate().multiply(BigDecimal.valueOf(durationHours));
        }
        return rate;
    }

    private BookingResponseDto convertToResponseDto(Booking booking) {
        BookingResponseDto dto = new BookingResponseDto();
        dto.setBookingId(booking.getBookingId());
        dto.setStartDate(booking.getStartDate());
        dto.setEndDate(booking.getEndDate());
        dto.setTotalPrice(booking.getTotalPrice());
        dto.setStatus(booking.getStatus());
        dto.setPaymentStatus(booking.getPaymentStatus());

        Equipment equipment = booking.getEquipment();
        EquipmentResponseDto equipmentDto = new EquipmentResponseDto();
        equipmentDto.setId(equipment.getId());
        equipmentDto.setName(equipment.getName());
        equipmentDto.setType(equipment.getType());
        equipmentDto.setHourlyRate(equipment.getHourlyRate());
        equipmentDto.setDailyRate(equipment.getDailyRate());
        equipmentDto.setLocation(equipment.getLocation());
        equipmentDto.setAvailability(equipment.getAvailability());
        dto.setEquipment(equipmentDto);
        
        
        User farmer = booking.getFarmer();
        UserResponseDto farmerDto = new UserResponseDto();
        farmerDto.setId(farmer.getId());
        farmerDto.setName(farmer.getName());
        farmerDto.setEmail(farmer.getEmail());
        farmerDto.setPhone(farmer.getPhone());
        dto.setFarmer(farmerDto);

        User owner = booking.getOwner();
        UserResponseDto ownerDto = new UserResponseDto();
        ownerDto.setId(owner.getId());
        ownerDto.setName(owner.getName());
        ownerDto.setEmail(owner.getEmail());
        ownerDto.setPhone(owner.getPhone());
        dto.setOwner(ownerDto);
        
        return dto;
    }
}