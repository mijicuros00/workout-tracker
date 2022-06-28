package com.ftn.WorkoutTrackerBackend.entity.dto;

import com.ftn.WorkoutTrackerBackend.entity.model.Exercise;
import com.ftn.WorkoutTrackerBackend.entity.model.WorkingSet;
import lombok.Builder;
import lombok.Data;

import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Builder
public class PerformedExerciseDTO {
    private Long id;
    List<WorkingSet> workingSets;
    private ExerciseDTO exercise;
}
