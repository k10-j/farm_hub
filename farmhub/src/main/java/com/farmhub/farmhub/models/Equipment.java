package com.farmhub.farmhub.models;

import com.farmhub.farmhub.enums.AvailabilityStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;      
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "equipment")
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id; // Renamed for consistency, but 'equipmentId' is also fine.

    @Column(nullable = false, name = "equipment_name")
    private String name;

    @Column(nullable = false)
    private String type;

    @Column(name = "hourly_rate", precision = 10, scale = 2) 
    private BigDecimal hourlyRate;

    @Column(name = "daily_rate", precision = 10, scale = 2) 
    private BigDecimal dailyRate;

    private String location;

    @Enumerated(EnumType.STRING)
    private AvailabilityStatus availability;

    // --- Relationships ---

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    // One piece of equipment can be in many bookings.
    @OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings = new ArrayList<>(); // Initialize the list
}