package com.farmhub.farmhub.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.farmhub.farmhub.enums.AvailabilityStatus;

@Entity
@Table(name = "produce")
@Getter
@Setter
public class Produce {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, name = "produce_name")
    private String name;

    @Column(name = "crop_type")
    private String cropType;
    
    @Column(columnDefinition = "TEXT")
    private String description;

    private String unit;

    @Column(nullable = false)
    private Double quantity;

    @Column(name = "price_per_unit", precision = 10, scale = 2)
    private BigDecimal pricePerUnit;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "harvest_date")
    private LocalDate harvestDate;

    @Enumerated(EnumType.STRING)
    private AvailabilityStatus availability;

    

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private User farmer;
    
    @OneToMany(mappedBy = "produce", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PriceHistory> priceHistory = new ArrayList<>();
    
    @OneToMany(mappedBy = "produce", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders = new ArrayList<>();
}