package com.ftn.WorkoutTrackerBackend.repository;

import com.ftn.WorkoutTrackerBackend.entity.model.CustomExercise;
import com.ftn.WorkoutTrackerBackend.entity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomExerciseRepository extends JpaRepository<CustomExercise, Long> {
    List<CustomExercise> findCustomExerciseByUser(User user);
    CustomExercise findCustomExerciseById(Long id);
}
