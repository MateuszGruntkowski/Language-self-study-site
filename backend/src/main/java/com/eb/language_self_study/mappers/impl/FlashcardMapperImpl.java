package com.eb.language_self_study.mappers.impl;

import com.eb.language_self_study.model.Flashcard;
import com.eb.language_self_study.model.dto.FlashcardDto;
import org.springframework.stereotype.Component;

@Component
public class FlashcardMapperImpl {



    public FlashcardDto mapFlashcardToDto(Flashcard flashcard) {
        FlashcardDto dto = new FlashcardDto();
        dto.setFlashcardId(flashcard.getFlashcardId());
        dto.setFrontContent(flashcard.getFrontContent());
        dto.setBackContent(flashcard.getBackContent());
        dto.setRepetitionCount(flashcard.getRepetitionCount());
        dto.setCreatedAt(flashcard.getCreatedAt());
        dto.setXpReward(flashcard.getXpReward());

        if (flashcard.getFlashcardSet() != null) {
            dto.setFlashcardSetId(flashcard.getFlashcardSet().getFlashcardSetId());
        }

        return dto;
    }

    public Flashcard mapFlashcardDtoToEntity(FlashcardDto dto) {
        Flashcard entity = new Flashcard();
        entity.setFlashcardId(dto.getFlashcardId());
        entity.setFrontContent(dto.getFrontContent());
        entity.setBackContent(dto.getBackContent());
        entity.setRepetitionCount(dto.getRepetitionCount());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setXpReward(dto.getXpReward());

        return entity;
    }
}
