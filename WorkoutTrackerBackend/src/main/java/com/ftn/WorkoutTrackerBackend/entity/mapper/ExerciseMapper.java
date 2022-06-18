package com.ftn.WorkoutTrackerBackend.entity.mapper;

import com.ftn.WorkoutTrackerBackend.entity.dto.ExerciseDTO;
import com.ftn.WorkoutTrackerBackend.entity.model.Exercise;

import java.util.List;
import java.util.stream.Collectors;

public class ExerciseMapper {

    public static Exercise mapModel(ExerciseDTO exerciseDTO){
        return Exercise.builder()
                .id(exerciseDTO.getId())
                .name(exerciseDTO.getName())
                .description(exerciseDTO.getDescription())
                .picutre(exerciseDTO.getPicutre())
                .muscleGroups(exerciseDTO.getMuscleGroups())
                .build();
    }

    public static ExerciseDTO mapDTO(Exercise exercise){
        return ExerciseDTO.builder()
                .id(exercise.getId())
                .name(exercise.getName())
                .description(exercise.getDescription())
                .picutre(exercise.getPicutre())
                .muscleGroups(exercise.getMuscleGroups())
                .build();
    }

    public static List<ExerciseDTO> mapListToDTO(List<Exercise> exercises){
        return exercises.stream().map(exercise -> mapDTO(exercise)).collect(Collectors.toList());
    }
}
