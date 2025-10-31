package com.farmhub.farmhub.dto;

import java.util.List;
import java.util.Map;


import lombok.Data;

@Data
public class ErrorResponseDto {
   List< Map<String, String>> message;
}