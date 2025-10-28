package com.farmhub.farmhub.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.farmhub.farmhub.models.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking,UUID>{
    
}
