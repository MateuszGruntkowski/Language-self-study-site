package com.eb.language_self_study.service;

import com.eb.language_self_study.model.FlashcardSet;
import com.eb.language_self_study.repository.FlashcardSetRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlashcardSetService {

    private FlashcardSetRepository flashcardSetRepository;

    public FlashcardSetService (FlashcardSetRepository flashcardSetRepository){
        this.flashcardSetRepository = flashcardSetRepository;
    }

    public List<FlashcardSet> findByUserId(Long userId) {
        List<FlashcardSet> flashcardSets = flashcardSetRepository.findFlashcardSetByUserUserId(userId);

        return flashcardSets;
    }

    public FlashcardSet createFlashcardSet(FlashcardSet flashcardSet) {
        return flashcardSetRepository.save(flashcardSet);
    }

    public void deleteFlashcardSet(Long flashcardSetId) {
        flashcardSetRepository.deleteById(flashcardSetId);
    }

    public FlashcardSet updateFlashcardSet(FlashcardSet flashcardSet) {
        return flashcardSetRepository.save(flashcardSet);
    }

    public boolean isExists(Long flashcardSetId) {
        return flashcardSetRepository.existsById(flashcardSetId);
    }
}
