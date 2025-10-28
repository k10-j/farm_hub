package com.farmhub.farmhub.models;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "agrovet_details")
@Getter
@Setter
public class AgroVetDetails {

    @Id
    private UUID id; // This will be the same UUID as the User's ID

    @Column(columnDefinition = "jsonb")
    private String specialization;

    @Column(name = "license_number")
    private String licenseNumber;

    @Column(name = "verified_date")
    private LocalDateTime verifiedDate;

    @Column(name = "products_handled", columnDefinition = "TEXT")
    private String productsHandled;

    @Column(name = "response_time")
    private Integer responseTime;

    // --- Relationship ---

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId // This is the key: it maps this entity's ID to the User's ID
    @JoinColumn(name = "id") // Join on the ID column
    private User user;
}