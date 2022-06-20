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
    private String image;
    private List<Long> muscleGroupsIdList;

    @Override
    public String toString() {
        return "ExerciseRequestDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", picutre='" + image + '\'' +
                ", muscleGroupsIdList=" + muscleGroupsIdList +
                '}';
    }
}
