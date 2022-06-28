package com.ftn.WorkoutTrackerBackend.entity.mapper;

import com.ftn.WorkoutTrackerBackend.entity.dto.PerformedExerciseDTO;
import com.ftn.WorkoutTrackerBackend.entity.model.PerformedExercise;

import java.util.List;
import java.util.stream.Collectors;

public class PerformedExerciseMapper {

    public static PerformedExerciseDTO mapDTO(PerformedExercise performedExercise){
        return PerformedExerciseDTO.builder()
                .id(performedExercise.getId())
                .exercise(ExerciseMapper.mapDTO(performedExercise.getExercise()))
                .workingSets(performedExercise.getWorkingSets())
                .build();
    }

    public static PerformedExercise mapModel(PerformedExerciseDTO performedExerciseDTO){
        return PerformedExercise.builder()
                .id(performedExerciseDTO.getId())
                .exercise(ExerciseMapper.mapModel(performedExerciseDTO.getExercise()))
                .workingSets(performedExerciseDTO.getWorkingSets())
                .build();
    }

    public static List<PerformedExerciseDTO> mapListToDTO(List<PerformedExercise> performedExercises){
        return performedExercises.stream().map(performedExercise -> mapDTO(performedExercise)).collect(Collectors.toList());
    }

    public static List<PerformedExercise> mapDTOListToModel(List<PerformedExerciseDTO> performedExerciseDTOS){
        return performedExerciseDTOS.stream().map(performedExercise -> mapModel(performedExercise)).collect(Collectors.toList());
    }
}
