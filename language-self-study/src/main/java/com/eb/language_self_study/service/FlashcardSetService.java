package com.eb.language_self_study.service;

import com.eb.language_self_study.exceptions.ResourceNotFoundException;
import com.eb.language_self_study.exceptions.UnauthorizedException;
import com.eb.language_self_study.mappers.impl.FlashcardMapperImpl;
import com.eb.language_self_study.mappers.impl.FlashcardSetMapperImpl;
import com.eb.language_self_study.mappers.impl.UserMapperImpl;
import com.eb.language_self_study.model.Flashcard;
import com.eb.language_self_study.model.FlashcardSet;
import com.eb.language_self_study.model.User;
import com.eb.language_self_study.model.dto.FlashcardDto;
import com.eb.language_self_study.model.dto.FlashcardSetDto;
import com.eb.language_self_study.model.dto.UserDto;
import com.eb.language_self_study.repository.FlashcardSetRepository;
import com.eb.language_self_study.repository.UserRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlashcardSetService {

    private final UserService userService;
    private final FlashcardSetRepository flashcardSetRepository;
    private final FlashcardSetMapperImpl flashcardSetMapper;
    private final FlashcardMapperImpl flashcardMapper;
    private final UserMapperImpl userMapper;

    @Autowired
    private EntityManager entityManager;

    public FlashcardSetService (FlashcardSetRepository flashcardSetRepository,
                                UserRepository userRepository,
                                FlashcardSetMapperImpl flashcardSetMapper,
                                FlashcardMapperImpl flashcardMapper,
                                UserService userService,
                                UserMapperImpl userMapper) {
        this.flashcardSetRepository = flashcardSetRepository;

        this.flashcardSetMapper = flashcardSetMapper;
        this.flashcardMapper = flashcardMapper;
        this.userService = userService;
        this.userMapper = userMapper;
    }


    public List<FlashcardSetDto> getFlashcardSetsByUserId(Long userId) {

        if(!userService.userExists(userId)){
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }

        return flashcardSetRepository.findFlashcardSetByUserUserId(userId)
                .stream()
                .map(flashcardSet -> flashcardSetMapper.mapToDto(flashcardSet))
                .collect(Collectors.toList());
    }


    public FlashcardSetDto createFlashcardSet(UserDto userDto, FlashcardSetDto flashcardSetDto) {

        User user = userMapper.mapFromDto(userDto);

        FlashcardSet flashcardSet = flashcardSetMapper.mapToEntity(flashcardSetDto);

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

        return flashcardSetMapper.mapToDto(savedSet);
    }

    @Transactional
    public void deleteFlashcardSet(Long userId, Long flashcardSetId) {

        FlashcardSet flashcardSet = flashcardSetRepository.findById(flashcardSetId)
                .orElseThrow(() -> new ResourceNotFoundException("Flashcard set not found"));

        if(!flashcardSet.getUser().getUserId().equals(userId)){
            throw new UnauthorizedException("User does not have permission to delete this flashcard set");
        }

        flashcardSet.getUser().getFlashcardSets().remove(flashcardSet);
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
        System.out.println("Updated flashcard set: " + updatedSet);
        return flashcardSetMapper.mapToDto(updatedSet);
    }

    public FlashcardSetDto getFlashcardSetById(Long userId, Long setId) {

        if(!userService.userExists(userId)){
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }

        FlashcardSet flashcardSet = flashcardSetRepository.findById(setId)
                .orElseThrow(() -> new ResourceNotFoundException("Flashcard set not found with id: " + setId));

        if(!flashcardSet.getUser().getUserId().equals(userId)){
            throw new UnauthorizedException("User does not have permission to access this flashcard set");
        }

        return flashcardSetMapper.mapToDto(flashcardSet);
    }

    public boolean flashcardSetExistsAndBelongsToUser(Long userId, Long setId) {
        return flashcardSetRepository.existsByFlashcardSetIdAndUserUserId(setId, userId);
    }
}
