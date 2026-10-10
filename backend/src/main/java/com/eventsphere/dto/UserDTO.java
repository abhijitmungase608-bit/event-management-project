package com.eventsphere.dto;

import com.eventsphere.model.Role;

import java.time.Instant;

public class UserDTO {
    private String id;
    private String fullName;
    private String email;
    private String phone;
    private Role role;
    private boolean enabled;
    private Instant createdAt;

    public UserDTO() {}

    public UserDTO(String id, String fullName, String email, String phone, Role role, boolean enabled, Instant createdAt) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.enabled = enabled;
        this.createdAt = createdAt;
    }

    public static UserDTOBuilder builder() {
        return new UserDTOBuilder();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public static class UserDTOBuilder {
        private String id;
        private String fullName;
        private String email;
        private String phone;
        private Role role;
        private boolean enabled;
        private Instant createdAt;

        public UserDTOBuilder id(String id) { this.id = id; return this; }
        public UserDTOBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public UserDTOBuilder email(String email) { this.email = email; return this; }
        public UserDTOBuilder phone(String phone) { this.phone = phone; return this; }
        public UserDTOBuilder role(Role role) { this.role = role; return this; }
        public UserDTOBuilder enabled(boolean enabled) { this.enabled = enabled; return this; }
        public UserDTOBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public UserDTO build() {
            return new UserDTO(id, fullName, email, phone, role, enabled, createdAt);
        }
    }
}
