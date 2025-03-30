package com.eb.language_self_study.model.dto;

import com.eb.language_self_study.model.FlashcardSet;
import com.eb.language_self_study.model.UserStatistics;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long user_id;
    private String username;
    private String email;
    private Date createdAt;

    private UserStatistics userStatistics;
    private List<FlashcardSet> flashcardSets;

}
