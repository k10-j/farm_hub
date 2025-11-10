package com.farmhub.farmhub.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PlantIdApiResponse {
    private ApiResult result;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ApiResult {
        @JsonProperty("is_plant")
        private ApiIsPlant isPlant;

        @JsonProperty("is_healthy")
        private ApiIsHealthy isHealthy;
        
        @JsonProperty("disease")
        private ApiDiseaseContainer disease;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ApiIsPlant {
        private boolean binary;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ApiIsHealthy {
        private boolean binary;
        private double probability;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ApiDiseaseContainer {
        private List<ApiDisease> suggestions;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ApiDisease {
        private String id;
        private String name;
        private double probability;
        @JsonProperty("similar_images")
        private List<ApiSimilarImage> similarImages;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ApiSimilarImage {
        private String url;
    }
}