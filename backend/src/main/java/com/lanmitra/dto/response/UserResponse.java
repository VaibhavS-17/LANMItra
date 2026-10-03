package com.lanmitra.dto.response;

import com.lanmitra.enums.UserRole;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private UserRole role;
    private String phone;
    private String avatarUrl;
}
