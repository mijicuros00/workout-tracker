package com.ftn.WorkoutTrackerBackend.service;

import com.ftn.WorkoutTrackerBackend.entity.model.User;
import com.ftn.WorkoutTrackerBackend.entity.model.Workout;

import java.util.List;

public interface WorkoutService{
    List<Workout> findWorkoutsByUser(User user);
    Workout findWorkoutById(Long id);
    Workout save(Workout workout);
}
