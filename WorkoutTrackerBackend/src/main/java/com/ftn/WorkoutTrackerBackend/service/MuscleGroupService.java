package com.ftn.WorkoutTrackerBackend.service;

import com.ftn.WorkoutTrackerBackend.entity.model.MuscleGroup;

public interface MuscleGroupService {
    MuscleGroup findMuscleGroupById(Long id);
    MuscleGroup save(MuscleGroup muscleGroup);
}
