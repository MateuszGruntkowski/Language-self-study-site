package com.eb.language_self_study.repository;
import com.eb.language_self_study.model.User;
import com.eb.language_self_study.model.dto.UserLeaderboardEntryDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    @Query("SELECT u FROM User u JOIN FETCH u.userStatistics ORDER BY u.userStatistics.totalXp DESC")
    List<User> findTopUsersByXp(Pageable pageable);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
