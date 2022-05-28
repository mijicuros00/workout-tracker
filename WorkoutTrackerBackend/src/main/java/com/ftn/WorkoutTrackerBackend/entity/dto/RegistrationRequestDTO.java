package com.ftn.WorkoutTrackerBackend.entity.dto;

import com.ftn.WorkoutTrackerBackend.entity.model.EGender;
import lombok.Data;

@Data
public class RegistrationRequestDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String repeatedPassword;
    private Integer age;
    private Integer weight;
    private Integer height;
    private EGender gender;

}
