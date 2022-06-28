package com.ftn.WorkoutTrackerBackend.repository;

import com.ftn.WorkoutTrackerBackend.entity.model.PerformedExercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerformedExerciseRepository extends JpaRepository<PerformedExercise, Long> {
    PerformedExercise findPerformedExerciseById(Long id);
}
