package com.farmhub.farmhub.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter // Use @Getter instead of @Data
@Setter // Use @Setter instead of @Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id; // Conventionally, the ID field is just named 'id'.

    @Column(nullable = false, length = 255, name = "full_name")
    private String name;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, length = 20, name = "phone_number") // Using snake_case for consistency
    private String phone;

    @Column(nullable = false)
    private String password;

    private String location;

    @Column(precision = 3, scale = 2)
    private BigDecimal rating;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // --- Relationships ---

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Equipment> equipment = new ArrayList<>(); // Initialize the list

    @OneToMany(mappedBy = "farmer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Produce> produce = new ArrayList<>(); // Initialize the list

    // CLARIFIED: Split bookings into two roles for clarity
    @OneToMany(mappedBy = "farmer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookingsAsFarmer = new ArrayList<>(); // For bookings where user is the renter

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookingsAsOwner = new ArrayList<>(); // For bookings where user is the equipment owner

    // CLARIFIED: Split orders into two roles for clarity
    @OneToMany(mappedBy = "buyer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> ordersAsBuyer = new ArrayList<>(); // For orders where user is the buyer

    @OneToMany(mappedBy = "farmer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> ordersAsFarmer = new ArrayList<>(); // For orders where user is the seller/farmer

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DiagnosisReport> diagnosisReports = new ArrayList<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private AgroVetDetails agroVetDetails;

    
    @PrePersist 
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}