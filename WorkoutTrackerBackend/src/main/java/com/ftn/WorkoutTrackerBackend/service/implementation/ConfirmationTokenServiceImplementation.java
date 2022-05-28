package com.ftn.WorkoutTrackerBackend.service.implementation;

import com.ftn.WorkoutTrackerBackend.entity.model.ConfirmationToken;
import com.ftn.WorkoutTrackerBackend.entity.model.User;
import com.ftn.WorkoutTrackerBackend.repository.ConfirmationTokenRepository;
import com.ftn.WorkoutTrackerBackend.service.ConfirmationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ConfirmationTokenServiceImplementation implements ConfirmationTokenService {

    @Autowired
    private ConfirmationTokenRepository repo;

    @Override
    public ConfirmationToken findByToken(String token) {
        // TODO Auto-generated method stub
        return repo.findByToken(token);
    }

    @Override
    public int updateConfirmedAt(String token, LocalDateTime confirmedAt) {
        // TODO Auto-generated method stub
        return repo.updateConfirmedAt(token, confirmedAt);

    }

    @Override
    public ConfirmationToken save(ConfirmationToken token) {
        // TODO Auto-generated method stub
        return repo.save(token);

    }

    @Override
    public ConfirmationToken findByUser(User user) {
        // TODO Auto-generated method stub
        return repo.findByUser(user);
    }
}
