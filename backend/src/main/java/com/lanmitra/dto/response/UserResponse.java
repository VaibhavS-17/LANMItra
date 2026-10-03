package com.lanmitra.dto.response;

import com.lanmitra.enums.UserRole;

public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private UserRole role;
    private String phone;
    private String avatarUrl;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public static UserResponseBuilder builder() { return new UserResponseBuilder(); }
    public static class UserResponseBuilder {
        private Long id; private String name; private String email; private com.lanmitra.enums.UserRole role; private String phone; private String avatarUrl;
        public UserResponseBuilder id(Long id) { this.id = id; return this; }
        public UserResponseBuilder name(String name) { this.name = name; return this; }
        public UserResponseBuilder email(String email) { this.email = email; return this; }
        public UserResponseBuilder role(com.lanmitra.enums.UserRole role) { this.role = role; return this; }
        public UserResponseBuilder phone(String phone) { this.phone = phone; return this; }
        public UserResponseBuilder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
        public UserResponse build() {
            UserResponse res = new UserResponse();
            res.setId(id); res.setName(name); res.setEmail(email); res.setRole(role); res.setPhone(phone); res.setAvatarUrl(avatarUrl);
            return res;
        }
    }
}
