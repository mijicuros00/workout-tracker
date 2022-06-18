package com.ftn.WorkoutTrackerBackend.repository;

import com.ftn.WorkoutTrackerBackend.entity.model.MuscleGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MuscleGroupRepository extends JpaRepository<MuscleGroup, Long> {
    MuscleGroup findMuscleGroupById(Long id);
}
