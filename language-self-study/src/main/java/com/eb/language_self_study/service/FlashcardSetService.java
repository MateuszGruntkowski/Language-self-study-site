package com.eb.language_self_study.service;

import com.eb.language_self_study.exceptions.ResourceNotFoundException;
import com.eb.language_self_study.exceptions.UnauthorizedException;
import com.eb.language_self_study.mappers.impl.FlashcardMapperImpl;
import com.eb.language_self_study.mappers.impl.FlashcardSetMapperImpl;
import com.eb.language_self_study.model.Flashcard;
import com.eb.language_self_study.model.FlashcardSet;
import com.eb.language_self_study.model.User;
import com.eb.language_self_study.model.dto.FlashcardDto;
import com.eb.language_self_study.model.dto.FlashcardSetDto;
import com.eb.language_self_study.repository.FlashcardSetRepository;
import com.eb.language_self_study.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlashcardSetService {

    private FlashcardSetRepository flashcardSetRepository;
    private FlashcardSetMapperImpl mapper;
    private UserRepository userRepository;
    private FlashcardMapperImpl flashcardMapper;

    public FlashcardSetService (FlashcardSetRepository flashcardSetRepository, UserRepository userRepository, FlashcardSetMapperImpl mapper, FlashcardMapperImpl flashcardMapper) {
        this.flashcardSetRepository = flashcardSetRepository;
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.flashcardMapper = flashcardMapper;
    }

    public List<FlashcardSetDto> getFlashcardSetsByUserId(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        return flashcardSetRepository.findFlashcardSetByUserUserId(userId)
                .stream()
                .map(flashcardSet -> mapper.mapToDto(flashcardSet))
                .collect(Collectors.toList());
    }

    public FlashcardSetDto createFlashcardSet(Long userId, FlashcardSetDto flashcardSetDto) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        FlashcardSet flashcardSet = mapper.mapToEntity(flashcardSetDto);

        flashcardSet.setUser(user);

        if(flashcardSetDto.getFlashcards() != null && !flashcardSetDto.getFlashcards().isEmpty()){
            List<Flashcard> flashcards = new ArrayList<>();

            for(FlashcardDto flashcardDto : flashcardSetDto.getFlashcards()){
                Flashcard flashcard = flashcardMapper.mapFlashcardDtoToEntity(flashcardDto);
                flashcard.setFlashcardSet(flashcardSet);
                flashcards.add(flashcard);
            }
            flashcardSet.setFlashcards(flashcards);

        }else{
            flashcardSet.setFlashcards(new ArrayList<>());
        }

        FlashcardSet savedSet = flashcardSetRepository.save(flashcardSet);

        return mapper.mapToDto(savedSet);
    }

    public void deleteFlashcardSet(Long userId, Long flashcardSetId) {

        FlashcardSet flashcardSet = flashcardSetRepository.findById(flashcardSetId)
                .orElseThrow(() -> new ResourceNotFoundException("Flashcard set not found with id: " + flashcardSetId));

        if(!flashcardSet.getUser().getUserId().equals(userId)){
            throw new UnauthorizedException("User does not have permission to delete this flashcard set");
        }
        flashcardSetRepository.deleteById(flashcardSetId);
    }

    public FlashcardSetDto updateFlashcardSet(Long userId, Long flashcardSetId, FlashcardSetDto flashcardSetDto) {

        FlashcardSet flashcardSet = flashcardSetRepository.findById(flashcardSetId)
                .orElseThrow(() -> new ResourceNotFoundException("Flashcard set not found with id: " + flashcardSetId));

        if(!flashcardSet.getUser().getUserId().equals(userId)){
            throw new UnauthorizedException("User does not have permission to update this flashcard set");
        }

        flashcardSet.setName(flashcardSetDto.getName());
        if (flashcardSetDto.getFlashcards() != null) {

            flashcardSet.getFlashcards().clear();

            List<Flashcard> updatedFlashcards = new ArrayList<>();
            for (FlashcardDto flashcardDto : flashcardSetDto.getFlashcards()) {
                Flashcard flashcard = flashcardMapper.mapFlashcardDtoToEntity(flashcardDto);
                flashcard.setFlashcardSet(flashcardSet);
                updatedFlashcards.add(flashcard);
            }
            flashcardSet.getFlashcards().addAll(updatedFlashcards);
        }

        FlashcardSet updatedSet = flashcardSetRepository.save(flashcardSet);
        return mapper.mapToDto(updatedSet);
    }

}
