package com.eventsphere.security;

import com.eventsphere.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserPrincipal implements UserDetails {

    private String id;
    private String fullName;
    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;
    private boolean enabled;

    public UserPrincipal() {}

    public UserPrincipal(String id, String fullName, String email, String password, Collection<? extends GrantedAuthority> authorities, boolean enabled) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
        this.enabled = enabled;
    }

    public static UserPrincipalBuilder builder() {
        return new UserPrincipalBuilder();
    }

    public static UserPrincipal create(User user) {
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().name());

        return UserPrincipal.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .password(user.getPasswordHash())
                .authorities(Collections.singletonList(authority))
                .enabled(user.isEnabled())
                .build();
    }

    public String getId() { return id; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public static class UserPrincipalBuilder {
        private String id;
        private String fullName;
        private String email;
        private String password;
        private Collection<? extends GrantedAuthority> authorities;
        private boolean enabled = true;

        public UserPrincipalBuilder id(String id) { this.id = id; return this; }
        public UserPrincipalBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public UserPrincipalBuilder email(String email) { this.email = email; return this; }
        public UserPrincipalBuilder password(String password) { this.password = password; return this; }
        public UserPrincipalBuilder authorities(Collection<? extends GrantedAuthority> authorities) { this.authorities = authorities; return this; }
        public UserPrincipalBuilder enabled(boolean enabled) { this.enabled = enabled; return this; }

        public UserPrincipal build() {
            return new UserPrincipal(id, fullName, email, password, authorities, enabled);
        }
    }
}
