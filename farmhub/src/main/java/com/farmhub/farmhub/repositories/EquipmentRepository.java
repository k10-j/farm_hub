package com.farmhub.farmhub.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.farmhub.farmhub.models.Equipment;


@Repository
public interface EquipmentRepository extends JpaRepository<Equipment,UUID> {
    
}
