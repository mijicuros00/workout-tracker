package com.ftn.WorkoutTrackerBackend.entity.mapper;

import com.ftn.WorkoutTrackerBackend.entity.dto.WorkoutDTO;
import com.ftn.WorkoutTrackerBackend.entity.model.Workout;

import java.util.List;
import java.util.stream.Collectors;

public class WorkoutMapper {

    public static WorkoutDTO mapDTO(Workout workout){
        return WorkoutDTO.builder()
                .id(workout.getId())
                .performedExercises(PerformedExerciseMapper.mapListToDTO(workout.getPerformedExercises()))
                .dateOfWorkout(workout.getDateOfWorkout())
                .build();
    }

    public static Workout mapModel(WorkoutDTO workoutDTO){
        return Workout.builder()
                .id(workoutDTO.getId())
                .performedExercises(PerformedExerciseMapper.mapDTOListToModel(workoutDTO.getPerformedExercises()))
                .dateOfWorkout(workoutDTO.getDateOfWorkout())
                .build();
    }

    public static List<WorkoutDTO> mapListToDTO(List<Workout> workouts){
        return workouts.stream().map(workout -> mapDTO(workout)).collect(Collectors.toList());
    }
}
