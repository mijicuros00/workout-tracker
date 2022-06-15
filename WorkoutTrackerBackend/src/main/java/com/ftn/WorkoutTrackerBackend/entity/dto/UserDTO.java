package com.ftn.WorkoutTrackerBackend.entity.dto;

import com.ftn.WorkoutTrackerBackend.entity.model.EGender;
import com.ftn.WorkoutTrackerBackend.entity.model.ERole;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Integer age;
    private Integer weight;
    private Integer height;
    private EGender gender;
    private ERole role;

}
