package com.farmhub.farmhub.services;

import com.farmhub.farmhub.dto.CreateProduceDto;
import com.farmhub.farmhub.dto.ProduceResponseDto;
import com.farmhub.farmhub.dto.UserResponseDto;
import com.farmhub.farmhub.enums.AvailabilityStatus;
import com.farmhub.farmhub.enums.Role;
import com.farmhub.farmhub.models.Produce;
import com.farmhub.farmhub.models.User;
import com.farmhub.farmhub.repositories.ProduceRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProduceService {

    private final ProduceRepository produceRepository;

    @Transactional
    public ProduceResponseDto createProduce(CreateProduceDto produceDto, User farmer) {
        Produce newProduce = convertToProduceEntity(produceDto, farmer);
        Produce savedProduce = produceRepository.save(newProduce);
        return convertToProduceResponseDto(savedProduce);
    }

    @Transactional(readOnly = true)
    public ProduceResponseDto getProduceById(UUID id) {
        if (id == null) {
            throw new EntityNotFoundException("Id here is null  but i dont now");

        }
        return produceRepository.findById(id)
                .map(this::convertToProduceResponseDto)
                .orElseThrow(() -> new EntityNotFoundException("Produce not found with ID: " + id));
    }

    @Transactional(readOnly = true)
    public List<ProduceResponseDto> getAllProduce() {
        return produceRepository.findAll()
                .stream()
                .map(this::convertToProduceResponseDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProduceResponseDto updateProduce(UUID id, Map<String, Object> updates) {
        Produce produceToUpdate = produceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produce not found with ID: " + id));

        if (updates.containsKey("name")) {
            produceToUpdate.setName((String) updates.get("name"));
        }
        if (updates.containsKey("quantity")) {
            produceToUpdate.setQuantity((Double) updates.get("quantity"));
        }

        Produce updatedProduce = produceRepository.save(produceToUpdate);
        return convertToProduceResponseDto(updatedProduce);
    }

    @Transactional
    public void deleteProduce(UUID produceId, User currentUser) {
        Produce produce = produceRepository.findById(produceId)
                .orElseThrow(() -> new EntityNotFoundException("Produce not found"));

        // Security Check: User can only delete if they are the owner OR an admin
        if (!produce.getFarmer().getId().equals(currentUser.getId()) && !currentUser.getRole().equals(Role.ADMIN)) {
            throw new IllegalStateException("You are not authorized to delete this item."); 
        }

        produceRepository.deleteById(produceId);
    }

    private ProduceResponseDto convertToProduceResponseDto(Produce produce) {
        ProduceResponseDto dto = new ProduceResponseDto();
        dto.setId(produce.getId());
        dto.setName(produce.getName());
        dto.setCropType(produce.getCropType());
        dto.setDescription(produce.getDescription());
        dto.setUnit(produce.getUnit());
        dto.setQuantity(produce.getQuantity());
        dto.setPricePerUnit(produce.getPricePerUnit());
        dto.setImageUrl(produce.getImageUrl());
        dto.setHarvestDate(produce.getHarvestDate());
        dto.setAvailability(produce.getAvailability());

        UserResponseDto farmerDto = new UserResponseDto();
        farmerDto.setId(produce.getFarmer().getId());
        farmerDto.setName(produce.getFarmer().getName());
        farmerDto.setEmail(produce.getFarmer().getEmail());
        farmerDto.setPhone(produce.getFarmer().getPhone());
        dto.setFarmer(farmerDto);

        return dto;
    }

    private Produce convertToProduceEntity(CreateProduceDto dto, User farmer) {
        Produce produce = new Produce();

        AvailabilityStatus availability = (dto.getQuantity() != null && dto.getQuantity() > 0)
                ? AvailabilityStatus.AVAILABLE
                : AvailabilityStatus.UNAVAILABLE;

        produce.setName(dto.getName());
        produce.setCropType(dto.getCropType());
        produce.setDescription(dto.getDescription());
        produce.setUnit(dto.getUnit());
        produce.setQuantity(dto.getQuantity());
        produce.setPricePerUnit(dto.getPricePerUnit());
        produce.setImageUrl(dto.getImageUrl());
        produce.setHarvestDate(dto.getHarvestDate());
        produce.setAvailability(availability);
        produce.setFarmer(farmer);

        return produce;
    }
}
