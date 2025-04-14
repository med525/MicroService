package com.example.blog.services;

import com.example.blog.entities.Blog;

import java.util.List;

public interface IBlogService {
    List<Blog> retrieveAllBlogs();

    Blog addBlog(Blog b);

    Blog updateBlog(Blog b);

    Blog retrieveBlog(Integer id);

    void deleteBlog(Integer id);
}
