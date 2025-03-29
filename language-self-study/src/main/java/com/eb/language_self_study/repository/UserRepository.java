package com.eb.language_self_study.repository;

import com.eb.language_self_study.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    @Query(value = """
        SELECT COUNT(*) + 1 FROM users u
        JOIN user_statistics us ON u.user_id = us.user_id
        WHERE us.total_xp > (
            SELECT us2.total_xp FROM user_statistics us2
            WHERE us2.user_id = :userId
        )
    """, nativeQuery = true)
    int findUserRank(@Param("userId") Long userId);

    @Query(value = """
        SELECT u.* FROM users u
        JOIN user_statistics us ON u.user_id = us.user_id
        ORDER BY us.total_xp DESC
        LIMIT 10
    """, nativeQuery = true)
    List<User> findTop10Users();
}
