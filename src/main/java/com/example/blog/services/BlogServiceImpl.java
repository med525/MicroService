package com.example.blog.services;

import com.example.blog.entities.Blog;
import com.example.blog.repositories.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogServiceImpl implements IBlogService {

    @Autowired
    BlogRepository blogRepository;

    public List<Blog> retrieveAllBlogs() {
        return (List<Blog>) blogRepository.findAll();
    }

    public Blog addBlog(Blog b) {
        return blogRepository.save(b);
    }

    public Blog updateBlog(Blog b) {
        return blogRepository.save(b);
    }

    public Blog retrieveBlog(Integer id) {
        return blogRepository.findById(id).orElse(null);
    }

    public void deleteBlog(Integer id) {
        blogRepository.deleteById(id);
    }
}
