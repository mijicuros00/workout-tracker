package com.ftn.WorkoutTrackerBackend.security.token;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
