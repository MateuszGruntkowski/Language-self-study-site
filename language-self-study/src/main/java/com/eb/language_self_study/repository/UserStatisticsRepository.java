package com.eb.language_self_study.repository;

import com.eb.language_self_study.model.UserStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStatisticsRepository extends JpaRepository<UserStatistics, Long> {

    @Query(value = """
        SELECT position FROM (
            SELECT user_id, RANK() OVER (ORDER BY total_xp DESC) AS position
            FROM user_statistics
        ) AS ranked
        WHERE user_id = :userId
        """, nativeQuery = true)
    Integer findUserRankingByUserId(@Param("userId") Long userId);
}
