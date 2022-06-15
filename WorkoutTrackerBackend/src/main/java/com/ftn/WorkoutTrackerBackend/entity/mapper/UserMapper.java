package com.ftn.WorkoutTrackerBackend.entity.mapper;

import com.ftn.WorkoutTrackerBackend.entity.dto.UserDTO;
import com.ftn.WorkoutTrackerBackend.entity.model.User;

public class UserMapper {

    public static UserDTO mapDTO(User user){
        return UserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .age(user.getAge())
                .height(user.getHeight())
                .gender(user.getGender())
                .weight(user.getWeight())
                .role(user.getRole())
                .build();
    }
}
