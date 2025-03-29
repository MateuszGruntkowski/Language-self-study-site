package com.eb.language_self_study.repository;

import com.eb.language_self_study.model.UserStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStatisticsRepository extends JpaRepository<UserStatistics, Long> {

}
