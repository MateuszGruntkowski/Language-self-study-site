package com.eb.language_self_study.model.dto;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserLeaderboardEntryDto {
    private Long userId;
    private String username;
    private int totalXp;
    private String profilePicName;
    private String profilePicType;
    private String profilePicBase64;


}
