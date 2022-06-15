package com.ftn.WorkoutTrackerBackend.entity.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateUserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private Integer age;
    private Integer weight;
    private Integer height;
}
