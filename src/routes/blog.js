const { body } = require("express-validator");
const express = require("express");
const { createBlog, getAllPosts, getPostById, updateBlogPost } = require("../controllers/blog");
const router = express.Router();
const validation = [
  body("title").isLength({ min: 5 }).withMessage("Minimal 5 karakter"),
  body("content")
    .isLength({ min: 5 })
    .withMessage("Content minimal 5 karakter"),
]

router.post(
  "/create", validation
  ,
  createBlog
);

router.get('/posts', getAllPosts);

router.get('/post/:postId', getPostById)

router.put('/post/:postId', validation, updateBlogPost)

module.exports = router;
