package com.farmhub.farmhub.models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "price_history")
@Getter
@Setter
public class PriceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id; // Maps to 'price_id'

    @Column(name = "price_per_unit", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerUnit;

    @Column(name = "changed_at", nullable = false, updatable = false)
    private LocalDateTime changedAt;
    
    private String reason;

    // --- Relationship ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "produce_id", nullable = false)
    private Produce produce;
    
    @PrePersist
    protected void onCreate() {
        this.changedAt = LocalDateTime.now();
    }
}