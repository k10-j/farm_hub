package com.farmhub.farmhub.repositories;

import com.farmhub.farmhub.models.Equipment;
import com.farmhub.farmhub.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EquipmentRepository extends JpaRepository<Equipment, UUID> {

    @Query("SELECT e FROM Equipment e JOIN FETCH e.owner WHERE e.owner = :owner")
    List<Equipment> findByOwnerWithDetails(@Param("owner") User owner);

    @Query("SELECT e FROM Equipment e JOIN FETCH e.owner WHERE e.id = :id")
    Optional<Equipment> findByIdWithDetails(@Param("id") UUID id);

    Optional<Equipment> findByIdAndOwner(UUID id, User owner);
    
    @Query("SELECT e FROM Equipment e JOIN FETCH e.owner")
    List<Equipment> findAllWithDetails();
}