package com.farmhub.farmhub.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "diagnosis_report")
@Getter
@Setter
public class DiagnosisReport {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id; // Maps to 'report_id'

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    @Column(name = "crop_type")
    private String cropType;

    // For PostgreSQL's JSONB type, we map it to a String.
    // The 'columnDefinition' tells Hibernate how to create the column.
    @Column(name = "pest_detected", columnDefinition = "jsonb")
    private String pestDetected;

    private Double confidence;

    @Column(columnDefinition = "TEXT")
    private String treatment;
    
    @Column(name = "upload_date", nullable = false, updatable = false)
    private LocalDateTime uploadDate;

    // --- Relationship ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @PrePersist
    protected void onCreate() {
        this.uploadDate = LocalDateTime.now();
    }
}
