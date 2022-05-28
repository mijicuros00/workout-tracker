package com.ftn.WorkoutTrackerBackend.repository;

import com.ftn.WorkoutTrackerBackend.entity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByEmail(String username);
    User findUserById(Long id);
}
