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
    private UUID id; 

    @Column(columnDefinition = "json")
    private String specialization;

    @Column(name = "license_number")
    private String licenseNumber;

    @Column(name = "verified_date")
    private LocalDateTime verifiedDate;

    @Column(name = "products_handled", columnDefinition = "TEXT")
    private String productsHandled;

    @Column(name = "response_time")
    private Integer responseTime;


    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id")
    private User user;
}