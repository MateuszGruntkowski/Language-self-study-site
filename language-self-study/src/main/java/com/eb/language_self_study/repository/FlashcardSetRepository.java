package com.eb.language_self_study.repository;

import com.eb.language_self_study.model.FlashcardSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlashcardSetRepository extends JpaRepository<FlashcardSet, Long> {
    List<FlashcardSet> findFlashcardSetByUserUserId(Long userId);

    boolean existsByFlashcardSetIdAndUserUserId(Long setId, Long userId);

}
