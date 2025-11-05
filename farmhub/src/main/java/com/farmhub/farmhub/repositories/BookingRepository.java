package com.farmhub.farmhub.repositories;

import com.farmhub.farmhub.models.Booking;
import com.farmhub.farmhub.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookingRepository extends JpaRepository<Booking, UUID> {

    /**
     * Checks for any existing, confirmed bookings that overlap with the requested time.
     * Logic: A conflict exists if (StartA < EndB) and (EndA > StartB).
     */
    @Query("SELECT b FROM Booking b WHERE b.equipment.id = :equipmentId " +
           "AND b.status = 'CONFIRMED' " +
           "AND b.startDate < :endDate " +
           "AND b.endDate > :startDate")
    List<Booking> findOverlappingBookings(
            @Param("equipmentId") UUID equipmentId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);
    

    @Query("SELECT b FROM Booking b " +
           "JOIN FETCH b.equipment e " +
           "JOIN FETCH b.farmer " +
           "JOIN FETCH b.owner " +
           "JOIN FETCH e.owner " +
           "WHERE b.bookingId = :id")
    Optional<Booking> findByIdWithDetails(@Param("id") UUID id);

    @Query("SELECT b FROM Booking b " +
           "JOIN FETCH b.equipment e " +
           "JOIN FETCH b.farmer " +
           "JOIN FETCH b.owner " +
           "JOIN FETCH e.owner " +
           "WHERE b.farmer = :farmer")
    List<Booking> findByFarmerWithDetails(@Param("farmer") User farmer);
    
    @Query("SELECT b FROM Booking b " +
           "JOIN FETCH b.equipment e " +
           "JOIN FETCH b.farmer " +
           "JOIN FETCH b.owner " +
           "JOIN FETCH e.owner " +
           "WHERE b.owner = :owner")
    List<Booking> findByOwnerWithDetails(@Param("owner") User owner);
    
    Optional<Booking> findByBookingIdAndFarmer(UUID id, User farmer);
    Optional<Booking> findByBookingIdAndOwner(UUID id, User owner);
}