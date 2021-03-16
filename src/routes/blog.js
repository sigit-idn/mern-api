const { body } = require("express-validator");
const express = require("express");
const { createBlog, getAllPosts } = require("../controllers/blog");
const router = express.Router();

router.post(
  "/create",
  [
    body("title").isLength({ min: 5 }).withMessage("Minimal 5 karakter"),
    body("content")
      .isLength({ min: 5 })
      .withMessage("Content minimal 5 karakter"),
  ],
  createBlog
);

router.get('/posts', getAllPosts)

module.exports = router;
