package com.farmhub.farmhub.services;

import com.farmhub.farmhub.dto.PlantDiseaseResponseDTO;
import com.farmhub.farmhub.dto.PlantDiseaseResponseDTO.DiseaseSuggestion;
import com.farmhub.farmhub.dto.PlantIdApiResponse;
import com.farmhub.farmhub.dto.PlantIdApiResponse.ApiDisease;
import com.farmhub.farmhub.dto.PlantIdApiResponse.ApiSimilarImage;
import com.farmhub.farmhub.exceptions.FileReadException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor 
public class PlantDiseaseDetectionService {

    @Value("${PLANTID_KEY}")
    private String apiKey;

    @Value("${PLANT_ID_URL}")
    private String apiUrl;

    private final RestTemplate restTemplate; 

    /**
     * Public method that handles file conversion and calls the API.
     */
   public PlantDiseaseResponseDTO detectDisease(MultipartFile imageFile, boolean similarImages) {
        if (imageFile == null || imageFile.isEmpty()) {
            throw new IllegalArgumentException("Image file is required");
        }

        try {
            String base64Image = Base64.getEncoder().encodeToString(imageFile.getBytes());
            List<String> images = List.of("data:" + imageFile.getContentType() + ";base64," + base64Image);

            PlantIdApiResponse apiResponse = callPlantIdApi(images, similarImages);
            System.out.println(apiResponse);
            return mapToResponseDto(apiResponse);
        
        } catch (IOException e) {
            throw new FileReadException("Failed to read image file: " + e.getMessage());
        }
    }

    /**
     * Private method that performs the actual API call.
     */
    private PlantIdApiResponse callPlantIdApi(List<String> images, boolean similarImages) {
        Map<String, Object> body = new HashMap<>();
        body.put("images", images);
        body.put("similar_images", similarImages);
        body.put("health", "only");
        body.put("classification_level", "all");
        body.put("symptoms", true);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Api-Key", apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<PlantIdApiResponse> response = restTemplate.exchange(
                apiUrl,
                HttpMethod.POST,
                entity,
                PlantIdApiResponse.class
        );

        return response.getBody();
    }

    /**
     * Private helper to map the raw API response to our clean, final DTO.
     */
    /**
     * Private helper to map the raw API response to our clean, final DTO.
     */
    private PlantDiseaseResponseDTO mapToResponseDto(PlantIdApiResponse apiResponse) {
        PlantDiseaseResponseDTO resultDTO = new PlantDiseaseResponseDTO();
        
        var apiResult = apiResponse.getResult();
        
        if (apiResult == null) {
            resultDTO.setPlantDetected(false);
            resultDTO.setHealthy(false);
            resultDTO.setPossibleDiseases(new ArrayList<>());
            return resultDTO;
        }

        
        if (apiResult.getIsPlant() != null) {
            resultDTO.setPlantDetected(apiResult.getIsPlant().isBinary());
        }

        var apiIsHealthy = apiResult.getIsHealthy();
        if (apiIsHealthy != null) {
            resultDTO.setHealthy(apiIsHealthy.isBinary());
            resultDTO.setHealthProbability(apiIsHealthy.getProbability());
        } else {
            resultDTO.setHealthy(false);
            resultDTO.setHealthProbability(0.0);
        }

        List<DiseaseSuggestion> diseases = new ArrayList<>();
        var apiDiseaseContainer = apiResult.getDisease();
        
        if (apiDiseaseContainer != null && apiDiseaseContainer.getSuggestions() != null) {
            for (ApiDisease apiDisease : apiDiseaseContainer.getSuggestions()) {
                DiseaseSuggestion ds = new DiseaseSuggestion();
                ds.setId(apiDisease.getId());
                ds.setName(apiDisease.getName());
                ds.setProbability(apiDisease.getProbability());
                
                List<String> urls = new ArrayList<>();
                if (apiDisease.getSimilarImages() != null) {
                    urls = apiDisease.getSimilarImages().stream()
                            .map(ApiSimilarImage::getUrl)
                            .collect(Collectors.toList());
                }
                ds.setSimilarImages(urls);
                diseases.add(ds);
            }
        }

        resultDTO.setPossibleDiseases(diseases);
        return resultDTO;
    }
}