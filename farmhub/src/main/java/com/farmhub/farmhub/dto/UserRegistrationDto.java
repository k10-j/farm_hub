package com.farmhub.farmhub.dto;

import lombok.Data;

@Data
public class UserRegistrationDto {
    private String full_name;
    private String email;
    private String password; 
    private String phone_number;
    private String location;

}
