package com.ftn.WorkoutTrackerBackend.service;

import com.ftn.WorkoutTrackerBackend.entity.dto.RegistrationRequestDTO;

public interface RegistrationService {

    String register(RegistrationRequestDTO registrationRequestDTO);
    String confirmToken(String token);

}
