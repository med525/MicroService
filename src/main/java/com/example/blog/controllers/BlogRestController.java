package com.example.blog.controllers;

import com.example.blog.entities.Blog;
import com.example.blog.services.IBlogService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/blog")
@CrossOrigin(origins = "http://localhost:4200")
public class BlogRestController {
	@Autowired
	IBlogService blogService;

	@GetMapping("/retrieve-all")
	public List<Blog> getBlogs() {
		return blogService.retrieveAllBlogs();
	}

	@GetMapping("/retrieve/{blog-id}")
	public Blog retrieveBlog(@PathVariable("blog-id") Integer blogId) {
		return blogService.retrieveBlog(blogId);
	}

	@PostMapping("/add")
	public Blog addBlog(@RequestBody Blog b) {
		return blogService.addBlog(b);
	}

	@DeleteMapping("/remove/{blog-id}")
	public void removeBlog(@PathVariable("blog-id") Integer blogId) {
		blogService.deleteBlog(blogId);
	}

	@PutMapping("/update")
	public Blog updateBlog(@RequestBody Blog b) {
		return blogService.updateBlog(b);
	}

	@PutMapping("/update-category/{id}")
	public ResponseEntity<Blog> updateCategory(
			@PathVariable Integer id,
			@RequestParam String category) {

		Blog blog = blogService.retrieveBlog(id);
		blog.setCategory(category);
		Blog updated = blogService.updateBlog(blog);
		return ResponseEntity.ok(updated);
	}

	@GetMapping("/health")
	public String healthCheck() {
		return "Blog service is running";
	}
}
