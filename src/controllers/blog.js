const { connect } = require("mongoose");
const BlogPost = require('../models/blog');
const {validationResult} = require('express-validator')

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

 Posting.save().then(result => res.status(201).json({
    message : "Blog Created Successfully",
    data    : result
  })).catch(err => console.log(`Error: ` + err)).finally(() => next())

};
