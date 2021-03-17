const { connect } = require("mongoose");
const BlogPost = require('../models/blog');
const {validationResult} = require('express-validator');
const path = require('path');
const fs = require('fs')

connect(
  "mongodb+srv://sigit:9IKqr3WR2FSMt8kZ@cluster0.b3oi5.mongodb.net/blog?retryWrites=true&w=majority"
).catch(err => console.log("err: " + err));

exports.createBlog = (req, res, next) => {
  const errors = validationResult(req)
  const { title, content } = req.body;
  const image = req.file.path
  
  if (!errors.isEmpty()) {
    const err = new Error("Invalid value input tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }
  
  if (!image) {
    const err = new Error("Please upload an image");
    err.errorStatus = 422;
    throw err;
  }

  const Posting = new BlogPost({
    title, content, image, author: {
        uid: 1,
        name: "Sigit Tri Nugroho",
      },
  })

 Posting.save().then(data => res.status(201).json({
    message : "Blog Created Successfully",
    data
  })).catch(err => console.log(`Error: ` + err)).finally(() => next())

};

exports.getAllPosts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage     = req.query.perPage || 6;
  let totalItems;

  BlogPost.find()
  .countDocuments()
  .then( count => {
    totalItems = count
    return BlogPost.find()
    .skip((parseInt(currentPage) - 1) * parseInt(perPage))
    .limit(parseInt(perPage))
  })
  .then(data => {
    res.status(200).json({
      message : "Blog loaded successfully",
      data,
      total_data : totalItems,
      per_page : parseInt(perPage),
      current_page : parseInt(currentPage)
    })
  })
  .catch(error => console.log(error))
}

exports.getPostById = (req, res, next) => {
  BlogPost.findById(req.params.postId).then(data => {
    if (!data) {
      const err = new Error('Data is not found')
      err.errorStatus= 404
      throw error
    }
    res.status(200).json({
      message : "Blog loaded successfully",
      data
    })
  })
  .catch(err => next(err))
}

exports.updateBlogPost = (req,res, next) => {
  console.log("ok");
  const errors = validationResult(req)
  const { title, content } = req.body;
  const image = req.file.path
  const postId = req.params.postId
  
  if (!errors.isEmpty()) {
    const err = new Error("Invalid value input tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }
  
  if (!image) {
    const err = new Error("Please upload an image");
    err.errorStatus = 422;
    throw err;
  }

  BlogPost.findById(postId).then(post =>{
    if (!post) {
      const err = new Error('Blog post is not found')
      err.status = 404;
      throw err;
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.image = image || post.image;

    return post.save()
  })
.then(data => 
  res.status(200).json({message: "Blog post updated successfully", data})
)
.catch(err => next(err))
}

exports.deleteBlogPost = (req, res, next) => {
  BlogPost.findById(req.params.postId)
  .then(result => {
    if (!result) {
      const err = new Error('Post not found')
      err.status = 404;
      throw err
    }

    removeImage(result.image)
    return BlogPost.findByIdAndRemove(req.params.postId)
  }).then(data => res.status(200).json({message : "Post deleted successfully", data}))
  .catch(err => next(err))}

  const removeImage = filePath => 
    fs.unlink(path.join(__dirname, '../..', filePath), err => console.log(err))