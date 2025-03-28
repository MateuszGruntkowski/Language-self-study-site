package com.eb.language_self_study.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="users")
public class User {

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
    @Lob
    private byte[] profilePicData;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

}
