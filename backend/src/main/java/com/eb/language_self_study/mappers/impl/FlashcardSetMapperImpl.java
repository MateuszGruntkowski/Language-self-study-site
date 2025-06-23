package com.eb.language_self_study.mappers.impl;

import com.eb.language_self_study.model.FlashcardSet;
import com.eb.language_self_study.model.dto.FlashcardDto;
import com.eb.language_self_study.model.dto.FlashcardSetDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class FlashcardSetMapperImpl {

    @Autowired
    private FlashcardMapperImpl flashcardMapper;

    public FlashcardSetDto mapToDto(FlashcardSet flashcardSet){

        FlashcardSetDto flashcardSetDto = new FlashcardSetDto();
        flashcardSetDto.setFlashcardSetId(flashcardSet.getFlashcardSetId());
        flashcardSetDto.setName(flashcardSet.getName());
        flashcardSetDto.setCreatedAt(flashcardSet.getCreatedAt());

        if (flashcardSet.getUser() != null) {
            flashcardSetDto.setUserId(flashcardSet.getUser().getUserId());
        }

        List<FlashcardDto> flashcardDtos = new ArrayList<>();
        if (flashcardSet.getFlashcards() != null) {
            flashcardDtos = flashcardSet.getFlashcards().stream()
                    .map(flashcard -> flashcardMapper.mapFlashcardToDto(flashcard))
                    .collect(Collectors.toList());
        }

        flashcardSetDto.setFlashcards(flashcardDtos);
        return flashcardSetDto;
    }

    public FlashcardSet mapToEntity(FlashcardSetDto flashcardSetDto){

        FlashcardSet flashcardSet = new FlashcardSet();

        flashcardSet.setFlashcardSetId(flashcardSetDto.getFlashcardSetId());
        flashcardSet.setName(flashcardSetDto.getName());
        flashcardSet.setCreatedAt(flashcardSetDto.getCreatedAt());

        return flashcardSet;
    }
}
