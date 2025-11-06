package com.farmhub.farmhub.services;

import com.farmhub.farmhub.dto.EquipmentPatchDto;
import com.farmhub.farmhub.dto.EquipmentRequestDto;
import com.farmhub.farmhub.dto.EquipmentResponseDto;
import com.farmhub.farmhub.dto.UserResponseDto;
import com.farmhub.farmhub.models.Equipment;
import com.farmhub.farmhub.models.User;
import com.farmhub.farmhub.repositories.EquipmentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;

    // --- CREATE ---
    @Transactional
    public EquipmentResponseDto createEquipment(EquipmentRequestDto dto, User owner) {
        Equipment equipment = new Equipment();
        equipment.setName(dto.getName());
        equipment.setType(dto.getType());
        equipment.setHourlyRate(dto.getHourlyRate());
        equipment.setDailyRate(dto.getDailyRate());
        equipment.setLocation(dto.getLocation());
        equipment.setAvailability(dto.getAvailability());
        equipment.setOwner(owner);

        Equipment savedEquipment = equipmentRepository.save(equipment);
        return convertToResponseDto(savedEquipment);
    }

    @Transactional(readOnly = true)
    public List<EquipmentResponseDto> getAllEquipment() {
        return equipmentRepository.findAllWithDetails().stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<EquipmentResponseDto> getMyEquipment(User owner) {
        return equipmentRepository.findByOwnerWithDetails(owner).stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EquipmentResponseDto getEquipmentById(UUID id) {
        Equipment equipment = equipmentRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new EntityNotFoundException("Equipment not found with ID: " + id));
        return convertToResponseDto(equipment);
    }

    @Transactional
    public EquipmentResponseDto updateEquipment(UUID id, EquipmentPatchDto dto, User owner) {
        Equipment equipment = equipmentRepository.findByIdAndOwner(id, owner)
                .orElseThrow(() -> new EntityNotFoundException("Equipment not found or you are not the owner."));

        if (dto.getName() != null && !dto.getName().isBlank()) {
            equipment.setName(dto.getName());
        }

        if (dto.getType() != null && !dto.getType().isBlank()) {
            equipment.setType(dto.getType());
        }

        if (dto.getHourlyRate() != null) {
            equipment.setHourlyRate(dto.getHourlyRate());
        }

        if (dto.getDailyRate() != null) {
            equipment.setDailyRate(dto.getDailyRate());
        }

        if (dto.getLocation() != null && !dto.getLocation().isBlank()) {
            equipment.setLocation(dto.getLocation());
        }

        if (dto.getAvailability() != null) {
            equipment.setAvailability(dto.getAvailability());
        }

        Equipment updatedEquipment = equipmentRepository.save(equipment);
        return convertToResponseDto(updatedEquipment);
    }

    @Transactional
    public void deleteEquipment(UUID id, User owner) {
        Equipment equipment = equipmentRepository.findByIdAndOwner(id, owner)
                .orElseThrow(() -> new EntityNotFoundException("Equipment not found or you are not the owner."));

        // Add a check for bookings later if needed
        // if (!equipment.getBookings().isEmpty()) {
        // throw new IllegalArgumentException("Cannot delete equipment with active
        // bookings.");
        // }

        equipmentRepository.delete(equipment);
    }

    private EquipmentResponseDto convertToResponseDto(Equipment equipment) {
        EquipmentResponseDto dto = new EquipmentResponseDto();
        dto.setId(equipment.getId());
        dto.setName(equipment.getName());
        dto.setType(equipment.getType());
        dto.setHourlyRate(equipment.getHourlyRate());
        dto.setDailyRate(equipment.getDailyRate());
        dto.setLocation(equipment.getLocation());
        dto.setAvailability(equipment.getAvailability());

        UserResponseDto ownerDto = new UserResponseDto();
        ownerDto.setId(equipment.getOwner().getId());
        ownerDto.setName(equipment.getOwner().getName());
        ownerDto.setEmail(equipment.getOwner().getEmail());
        ownerDto.setPhone(equipment.getOwner().getPhone());
        dto.setOwner(ownerDto);

        return dto;
    }
}