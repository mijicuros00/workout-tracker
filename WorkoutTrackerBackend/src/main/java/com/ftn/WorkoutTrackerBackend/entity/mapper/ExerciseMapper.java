package com.ftn.WorkoutTrackerBackend.entity.mapper;

import com.ftn.WorkoutTrackerBackend.entity.dto.ExerciseDTO;
import com.ftn.WorkoutTrackerBackend.entity.dto.ExerciseRequestDTO;
import com.ftn.WorkoutTrackerBackend.entity.model.Exercise;
import com.ftn.WorkoutTrackerBackend.entity.model.MuscleGroup;

import java.util.List;
import java.util.stream.Collectors;

public class ExerciseMapper {

    public static Exercise mapModel(ExerciseDTO exerciseDTO){
        return Exercise.builder()
                .id(exerciseDTO.getId())
                .name(exerciseDTO.getName())
                .description(exerciseDTO.getDescription())
                .image(exerciseDTO.getImage())
                .muscleGroups(exerciseDTO.getMuscleGroups())
                .build();
    }

    public static ExerciseDTO mapDTO(Exercise exercise){
        return ExerciseDTO.builder()
                .id(exercise.getId())
                .name(exercise.getName())
                .description(exercise.getDescription())
                .image(exercise.getImage())
                .muscleGroups(exercise.getMuscleGroups())
                .build();
    }

    public static Exercise mapRequestDTOToModel(ExerciseRequestDTO exerciseRequestDTO, List<MuscleGroup> muscleGroups){
        return Exercise.builder()
                .name(exerciseRequestDTO.getName())
                .description(exerciseRequestDTO.getDescription())
                .image(exerciseRequestDTO.getImage())
                .muscleGroups(muscleGroups)
                .build();
    }

    public static List<ExerciseDTO> mapListToDTO(List<Exercise> exercises){
        return exercises.stream().map(exercise -> mapDTO(exercise)).collect(Collectors.toList());
    }
}
