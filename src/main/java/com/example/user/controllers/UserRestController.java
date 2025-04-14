package com.example.user.controllers;

import com.example.user.entities.User;
import com.example.user.services.IUserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserRestController {
	@Autowired
	IUserService userService;

	@GetMapping("/retrieve-all")
	public List<User> getUsers() {
		return userService.retrieveAllUsers();
	}

	@GetMapping("/retrieve/{user-id}")
	public User retrieveUser(@PathVariable("user-id") Integer userId) {
		return userService.retrieveUser(userId);
	}

	@PostMapping("/add")
	public User addUser(@RequestBody User u) {
		return userService.addUser(u);
	}

	@DeleteMapping("/remove/{user-id}")
	public void removeUser(@PathVariable("user-id") Integer userId) {
		userService.deleteUser(userId);
	}

	@PutMapping("/update")
	public User updateUser(@RequestBody User u) {
		return userService.updateUser(u);
	}

	@PutMapping("/update-status/{id}")
	public ResponseEntity<User> updateStatus(
			@PathVariable Integer id,
			@RequestParam String status) {

		User user = userService.retrieveUser(id);
		user.setStatus(status);
		User updated = userService.updateUser(user);
		return ResponseEntity.ok(updated);
	}

	@GetMapping("/health")
	public String healthCheck() {
		return "User service is running";
	}

}
