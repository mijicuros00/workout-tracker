package com.ftn.WorkoutTrackerBackend.service;

public interface EmailSenderService {

    void send(String to, String email, String subject);
    String registerEmail(String name, String link);

}
