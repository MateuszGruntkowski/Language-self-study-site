package com.eb.language_self_study.repository;

import com.eb.language_self_study.model.Flashcard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlashcardRepository extends JpaRepository<Flashcard, Long> {
    List<Flashcard> findFlashcardsByFlashcardSetFlashcardSetId(Long flashcardSetId);
}
