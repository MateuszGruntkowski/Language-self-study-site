package com.eb.language_self_study.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class FlashcardDto {
    private Long flashcardId;
    private String frontContent;
    private String backContent;
    private int repetitionCount;
    private Date createdAt;
    private int xpReward;
    private Long flashcardSetId;

}
