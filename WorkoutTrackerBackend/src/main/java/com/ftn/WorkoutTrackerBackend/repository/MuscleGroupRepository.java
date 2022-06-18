package com.ftn.WorkoutTrackerBackend.repository;

import com.ftn.WorkoutTrackerBackend.entity.model.MuscleGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BodyPartRepository extends JpaRepository<MuscleGroup, Long> {
    MuscleGroup findBodyPartById(Long id);
}
