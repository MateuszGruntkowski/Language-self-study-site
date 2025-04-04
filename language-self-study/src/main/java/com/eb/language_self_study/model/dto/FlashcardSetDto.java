package com.eb.language_self_study.model.dto;

import com.eb.language_self_study.model.Flashcard;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class FlashcardSetDto {

    private Long flashcardSetId;
    private String name;
    private Date createdAt;
    private Long userId;
    private List<FlashcardDto> flashcards;
}
