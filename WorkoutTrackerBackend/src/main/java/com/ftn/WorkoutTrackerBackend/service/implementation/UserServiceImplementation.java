package com.ftn.WorkoutTrackerBackend.service.implementation;

import com.ftn.WorkoutTrackerBackend.Exception.NotFoundException;
import com.ftn.WorkoutTrackerBackend.entity.dto.UpdateUserDTO;
import com.ftn.WorkoutTrackerBackend.entity.model.User;
import com.ftn.WorkoutTrackerBackend.repository.UserRepository;
import com.ftn.WorkoutTrackerBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImplementation implements UserService, UserDetailsService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public User findUserById(Long id) {
        return userRepository.findUserById(id);
    }

    @Override
    public User update(Long id, UpdateUserDTO updateUserDTO) throws NotFoundException {
        User updatedUser = userRepository.findUserById(id);

        if(updatedUser == null){
            throw new NotFoundException("Ispit with ID=" + id + " not found");
        }

        updatedUser.setFirstName(updateUserDTO.getFirstName());
        updatedUser.setLastName(updateUserDTO.getLastName());
        updatedUser.setEmail(updateUserDTO.getEmail());
        updatedUser.setAge(updateUserDTO.getAge());
        updatedUser.setHeight(updateUserDTO.getHeight());
        updatedUser.setWeight(updateUserDTO.getWeight());

        userRepository.save(updatedUser);

        return updatedUser;
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = this.findUserByEmail(email);

        if(user == null) {
            throw new UsernameNotFoundException(String.format("No user found with email '%s'.", email));
        } else {
            List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
            String role = "ROLE_" + user.getRole().toString();
            grantedAuthorities.add(new SimpleGrantedAuthority(role));

//            grantedAuthorities.add(new SimpleGrantedAuthority(user.getRole().name()));

            return new org.springframework.security.core.userdetails.User(
                    user.getUsername(),
                    user.getPassword(),
                    grantedAuthorities);
        }
    }
}
