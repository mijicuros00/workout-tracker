package com.ftn.WorkoutTrackerBackend.repository;

import com.ftn.WorkoutTrackerBackend.entity.model.Exercise;
import com.ftn.WorkoutTrackerBackend.entity.model.MuscleGroup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    Exercise findExerciseById(Long id);
    Page<Exercise> findExercisesByNameIsContaining(String search, Pageable pageable);
    Page<Exercise> findExercisesByNameIsContainingAndMuscleGroupsContaining(String search, Pageable pageable, MuscleGroup muscleGroup);
}
