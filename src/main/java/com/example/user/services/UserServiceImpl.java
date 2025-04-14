package com.example.user.services;

import com.example.user.entities.User;
import com.example.user.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    UserRepository userRepository;

    public List<User> retrieveAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    public User addUser(User u) {
        return userRepository.save(u);
    }

    public User updateUser(User u) {
        return userRepository.save(u);
    }

    public User retrieveUser(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}
