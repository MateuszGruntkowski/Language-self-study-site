package com.eb.language_self_study.repository;

import com.eb.language_self_study.model.FlashcardSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FlashcardSetRepository extends JpaRepository<FlashcardSet, Long> {
    List<FlashcardSet> findFlashcardSetByUserUserId(Long userId);

    boolean existsByFlashcardSetIdAndUserUserId(Long setId, Long userId);

    @Query("SELECT fs FROM FlashcardSet fs LEFT JOIN FETCH fs.flashcards WHERE fs.flashcardSetId = :id")
    Optional<FlashcardSet> findByIdWithFlashcards(@Param("id") Long id);

    @Modifying
    @Query("DELETE FROM FlashcardSet fs WHERE fs.flashcardSetId = :flashcardSetId AND fs.user.userId = :userId")
    void deleteByIdAndUserId(@Param("flashcardSetId") Long flashcardSetId, @Param("userId") Long userId);
}
