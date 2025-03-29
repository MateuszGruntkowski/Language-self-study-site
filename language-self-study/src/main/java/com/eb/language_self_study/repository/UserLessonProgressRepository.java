package com.eb.language_self_study.repository;

import com.eb.language_self_study.model.UserLessonProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLessonProgressRepository extends JpaRepository<UserLessonProgress, Long> {

}
