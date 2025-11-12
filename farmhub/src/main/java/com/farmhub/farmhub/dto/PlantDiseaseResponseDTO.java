package com.farmhub.farmhub.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlantDiseaseResponseDTO {

    private boolean plantDetected;
    private boolean healthy;
    private double healthProbability;
    private List<DiseaseSuggestion> possibleDiseases;

    @Getter
    @Setter
    public static class DiseaseSuggestion {
        private String id;
        private String name;
        private double probability;
        private List<String> similarImages;
    }
}
