package com.example.user.services;

import com.example.user.entities.User;

import java.util.List;

public interface IUserService {
    List<User> retrieveAllUsers();

    User addUser(User u);

    User updateUser(User u);

    User retrieveUser(Integer id);

    void deleteUser(Integer id);
}
