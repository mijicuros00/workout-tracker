package com.ftn.WorkoutTrackerBackend.service;

import com.ftn.WorkoutTrackerBackend.entity.model.ConfirmationToken;
import com.ftn.WorkoutTrackerBackend.entity.model.User;

import java.time.LocalDateTime;

public interface ConfirmationTokenService {

    ConfirmationToken findByToken(String token);
    ConfirmationToken findByUser(User user);
    int updateConfirmedAt(String token,
                          LocalDateTime confirmedAt);
    ConfirmationToken save(ConfirmationToken token);

}
