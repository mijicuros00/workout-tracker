package com.ftn.workouttrackerbackend.repository;

import com.ftn.workouttrackerbackend.entity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByEmail(String username);
    User findUserById(Long id);
}
