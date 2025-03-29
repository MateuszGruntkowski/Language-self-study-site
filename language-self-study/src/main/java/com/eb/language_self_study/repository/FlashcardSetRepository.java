package com.eb.language_self_study.repository;

import com.eb.language_self_study.model.FlashcardSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlashcardSetRepository extends JpaRepository<FlashcardSet, Long> {
    // Custom query methods can be defined here if needed
    // For example, to find a FlashcardSet by its name:
    // Optional<FlashcardSet> findByName(String name);
}
