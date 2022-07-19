package com.ftn.WorkoutTrackerBackend.entity.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ExerciseRequestDTO {
    private Long id;
    private String name;
    private String description;
    private List<String> images;
    private List<Long> muscleGroupsIdList;

    @Override
    public String toString() {
        return "ExerciseRequestDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", images='" + images + '\'' +
                ", muscleGroupsIdList=" + muscleGroupsIdList +
                '}';
    }
}
