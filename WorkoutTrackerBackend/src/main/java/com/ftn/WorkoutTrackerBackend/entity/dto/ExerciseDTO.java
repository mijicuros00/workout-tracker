package com.ftn.WorkoutTrackerBackend.entity.dto;

import com.ftn.WorkoutTrackerBackend.entity.model.MuscleGroup;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.ManyToMany;
import java.util.List;

@Data
@Builder
public class ExerciseDTO {
    private Long id;
    private String name;
    private String description;
    private String picutre;
    private List<MuscleGroup> muscleGroups;
}
