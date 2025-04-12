package com.eb.language_self_study.service;

import com.eb.language_self_study.exceptions.ResourceNotFoundException;
import com.eb.language_self_study.mappers.impl.FlashcardMapperImpl;
import com.eb.language_self_study.mappers.impl.FlashcardSetMapperImpl;
import com.eb.language_self_study.model.Flashcard;
import com.eb.language_self_study.model.FlashcardSet;
import com.eb.language_self_study.model.User;
import com.eb.language_self_study.model.dto.FlashcardDto;
import com.eb.language_self_study.model.dto.FlashcardSetDto;
import com.eb.language_self_study.model.dto.UserDto;
import com.eb.language_self_study.repository.FlashcardRepository;
import com.eb.language_self_study.repository.FlashcardSetRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlashcardService {

    private final FlashcardSetRepository flashcardSetRepository;
    private FlashcardRepository flashcardRepository;
    private UserService userService;
    private FlashcardSetService flashcardSetService;
    private FlashcardMapperImpl flashcardMapper;
    private FlashcardSetMapperImpl flashcardSetMapper;

    public FlashcardService(UserService userService,
                            FlashcardSetService flashcardSetService,
                            FlashcardRepository flashcardRepository,
                            FlashcardMapperImpl flashcardMapper,
                            FlashcardSetMapperImpl flashcardSetMapper, FlashcardSetRepository flashcardSetRepository) {
        this.userService = userService;
        this.flashcardSetService = flashcardSetService;
        this.flashcardRepository = flashcardRepository;
        this.flashcardMapper = flashcardMapper;
        this.flashcardSetMapper = flashcardSetMapper;
        this.flashcardSetRepository = flashcardSetRepository;
    }


    public List<FlashcardDto> getFlashcardsBySetId(Long userId, Long flashcardSetId) {

        if(!userService.userExists(userId)){
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }

        if(!flashcardSetService.flashcardSetExistsAndBelongsToUser(userId, flashcardSetId)){
            throw new ResourceNotFoundException("Flashcard set not found with id: " + flashcardSetId);
        }

        List<FlashcardDto> flashcards = flashcardRepository.findFlashcardsByFlashcardSetFlashcardSetId(flashcardSetId)
                .stream()
                .map(flashcard -> flashcardMapper.mapFlashcardToDto(flashcard))
                .toList();

        return flashcards;
    }


    public FlashcardDto getFlashcardById(Long userId, Long flashcardSetId, Long flashcardId) {

        if(!userService.userExists(userId)){
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }

        if(!flashcardSetService.flashcardSetExistsAndBelongsToUser(userId, flashcardSetId)){
            throw new ResourceNotFoundException("Flashcard set not found with id: " + flashcardSetId);
        }

        Flashcard flashcard = flashcardRepository.findById(flashcardId)
                .orElseThrow(() -> new ResourceNotFoundException("Flashcard not found with id: " + flashcardId));


        return flashcardMapper.mapFlashcardToDto(flashcard);
    }


    public void deleteFlashcard(Long userId, Long setId, Long flashcardId) {

        if(!userService.userExists(userId)){
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }

        if(!flashcardSetService.flashcardSetExistsAndBelongsToUser(userId, setId)){
            throw new ResourceNotFoundException("Flashcard set not found with id: " + setId);
        }

        flashcardRepository.deleteById(flashcardId);
    }


    public FlashcardDto createFlashcard(Long userId, Long setId, FlashcardDto flashcardDto) {

        if(!userService.userExists(userId)){
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }

        if(!flashcardSetService.flashcardSetExistsAndBelongsToUser(userId, setId)){
            throw new ResourceNotFoundException("Flashcard set not found with id: " + setId);
        }

        Flashcard flashcard = flashcardMapper.mapFlashcardDtoToEntity(flashcardDto);
        FlashcardSetDto flashcardSetDto = flashcardSetService.getFlashcardSetById(userId, setId);
        FlashcardSet flashcardSet = flashcardSetMapper.mapToEntity(flashcardSetDto);
        flashcard.setFlashcardSet(flashcardSet);

        flashcard = flashcardRepository.save(flashcard);

        return flashcardMapper.mapFlashcardToDto(flashcard);
    }

    public FlashcardDto updateFlashcard(Long userId, Long setId, Long flashcardId, FlashcardDto flashcardDto) {

        if(!userService.userExists(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }

        if(!flashcardSetService.flashcardSetExistsAndBelongsToUser(userId, setId)) {
            throw new ResourceNotFoundException("Flashcard set not found with id: " + setId);
        }

        Flashcard existingFlashcard = flashcardRepository.findById(flashcardId)
                .orElseThrow(() -> new ResourceNotFoundException("Flashcard not found with id: " + flashcardId));

        existingFlashcard.setFrontContent(flashcardDto.getFrontContent());
        existingFlashcard.setBackContent(flashcardDto.getBackContent());
        existingFlashcard.setFlashcardId(flashcardId);

        flashcardRepository.save(existingFlashcard);

        return flashcardMapper.mapFlashcardToDto(existingFlashcard);
    }

    public boolean flashcardExists(Long flashcardId) {
        return flashcardRepository.existsById(flashcardId);
    }
}
