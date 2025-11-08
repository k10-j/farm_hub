package com.farmhub.farmhub.services;

import com.farmhub.farmhub.dto.AgroVetDetailsDto;
import com.farmhub.farmhub.dto.CreateAgroVetDetailsDto;
import com.farmhub.farmhub.dto.UpdateAgroVetDetailsDto;
import com.farmhub.farmhub.models.AgroVetDetails;
import com.farmhub.farmhub.models.User;
import com.farmhub.farmhub.repositories.AgroVetDetailsRepository;
import com.farmhub.farmhub.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AgroVetDetailsService {

    private final AgroVetDetailsRepository agroVetDetailsRepository;
    private final UserRepository userRepository;

    @Transactional
    public AgroVetDetailsDto createAgroVetDetails(CreateAgroVetDetailsDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + dto.getUserId()));

        if (agroVetDetailsRepository.existsById(dto.getUserId())) {
            throw new RuntimeException("AgroVet details already exist for this user");
        }

        AgroVetDetails agroVetDetails = new AgroVetDetails();
        agroVetDetails.setUser(user);
        agroVetDetails.setSpecialization(dto.getSpecialization());
        agroVetDetails.setLicenseNumber(dto.getLicenseNumber());
        agroVetDetails.setProductsHandled(dto.getProductsHandled());
        agroVetDetails.setResponseTime(dto.getResponseTime());
        agroVetDetails.setVerifiedDate(LocalDateTime.now());

        AgroVetDetails saved = agroVetDetailsRepository.save(agroVetDetails);
        return convertToDto(saved);
    }

    @Transactional(readOnly = true)
    public AgroVetDetailsDto getAgroVetDetailsById(UUID id) {
        AgroVetDetails agroVetDetails = agroVetDetailsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("AgroVet details not found with id: " + id));
        return convertToDto(agroVetDetails);
    }

    @Transactional(readOnly = true)
    public List<AgroVetDetailsDto> getAllAgroVetDetails() {
        return agroVetDetailsRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public AgroVetDetailsDto updateAgroVetDetails(UUID id, UpdateAgroVetDetailsDto dto) {
        AgroVetDetails agroVetDetails = agroVetDetailsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("AgroVet details not found with id: " + id));

        if (dto.getSpecialization() != null) {
            agroVetDetails.setSpecialization(dto.getSpecialization());
        }
        if (dto.getLicenseNumber() != null) {
            agroVetDetails.setLicenseNumber(dto.getLicenseNumber());
        }
        if (dto.getProductsHandled() != null) {
            agroVetDetails.setProductsHandled(dto.getProductsHandled());
        }
        if (dto.getResponseTime() != null) {
            agroVetDetails.setResponseTime(dto.getResponseTime());
        }

        AgroVetDetails updated = agroVetDetailsRepository.save(agroVetDetails);
        return convertToDto(updated);
    }

    @Transactional
    public void deleteAgroVetDetails(UUID id) {
        if (!agroVetDetailsRepository.existsById(id)) {
            throw new RuntimeException("AgroVet details not found with id: " + id);
        }
        agroVetDetailsRepository.deleteById(id);
    }

    private AgroVetDetailsDto convertToDto(AgroVetDetails agroVetDetails) {
        AgroVetDetailsDto dto = new AgroVetDetailsDto();
        dto.setId(agroVetDetails.getId());
        dto.setSpecialization(agroVetDetails.getSpecialization());
        dto.setLicenseNumber(agroVetDetails.getLicenseNumber());
        dto.setVerifiedDate(agroVetDetails.getVerifiedDate());
        dto.setProductsHandled(agroVetDetails.getProductsHandled());
        dto.setResponseTime(agroVetDetails.getResponseTime());
        
        if (agroVetDetails.getUser() != null) {
            dto.setUserId(agroVetDetails.getUser().getId());
            dto.setUserName(agroVetDetails.getUser().getName());
            dto.setUserEmail(agroVetDetails.getUser().getEmail());
        }
        
        return dto;
    }
}