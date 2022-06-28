package com.ftn.WorkoutTrackerBackend.entity.dto;

import com.ftn.WorkoutTrackerBackend.entity.model.PerformedExercise;
import lombok.Builder;
import lombok.Data;

import javax.persistence.OneToMany;
import java.util.List;

@Data
@Builder
public class WorkoutDTO {
    private Long id;
    List<PerformedExerciseDTO> performedExercises;
}
