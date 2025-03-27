package com.eb.language_self_study.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name="users")
public class User {

    public User(Long id, String username, String email, String password, Integer totalXp, Date createdAt, String profilePicName, String profilePicType) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.totalXp = totalXp;
        this.createdAt = createdAt;
        this.profilePicName = profilePicName;
        this.profilePicType = profilePicType;

    }

    public User() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private String password;
    private Integer totalXp = 0;
    private Date createdAt;

    private String profilePicName;
    private String profilePicType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getTotalXp() {
        return totalXp;
    }

    public void setTotalXp(Integer totalXp) {
        this.totalXp = totalXp;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getProfilePicName() {
        return profilePicName;
    }

    public void setProfilePicName(String profilePicName) {
        this.profilePicName = profilePicName;
    }

    public String getProfilePicType() {
        return profilePicType;
    }

    public void setProfilePicType(String profilePicType) {
        this.profilePicType = profilePicType;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

}
