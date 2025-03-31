package com.eb.language_self_study.repository;

import com.eb.language_self_study.model.FlashcardSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlashcardSetRepository extends JpaRepository<FlashcardSet, Long> {
    List<FlashcardSet> findFlashcardSetByUserUserId(Long userId);
    // Custom query methods can be defined here if needed
    // For example, to find a FlashcardSet by its name:
    // Optional<FlashcardSet> findByName(String name);
}
