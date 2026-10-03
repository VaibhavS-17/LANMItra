package com.lanmitra.dto.request;

import com.lanmitra.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank
    private String name;
    
    @Email
    @NotBlank
    private String email;
    
    @NotBlank
    @Size(min = 8)
    private String password;
    
    @NotNull
    private UserRole role;
}
