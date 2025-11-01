package com.farmhub.farmhub.dto;

import java.util.UUID;

public interface CrudOparation {

    public UserResponseDto getData(UUID id);

    public void updataData(UUID id);

    public void deletedata(UUID id);
    
}
