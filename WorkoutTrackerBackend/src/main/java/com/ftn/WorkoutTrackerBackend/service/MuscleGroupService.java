package com.ftn.WorkoutTrackerBackend.service;

import com.ftn.WorkoutTrackerBackend.entity.model.MuscleGroup;

import java.util.List;

public interface MuscleGroupService {
    List<MuscleGroup> findAll();
    MuscleGroup findMuscleGroupById(Long id);
    MuscleGroup save(MuscleGroup muscleGroup);
}
