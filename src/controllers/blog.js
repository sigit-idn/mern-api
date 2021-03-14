const { connect } = require("mongoose");
const BlogPost = require('../models/blog');

connect(
  "mongodb+srv://sigit:9IKqr3WR2FSMt8kZ@cluster0.b3oi5.mongodb.net/blog?retryWrites=true&w=majority"
);

exports.createBlog = async (req, res, next) => {
  const { title, content } = req.body;
  
  const Posting = new BlogPost({
    title, content, author: {
        uid: 1,
        name: "Sigit Tri Nugroho",
      },
  })

  await Posting.save().then(result => res.status(201).json({
    message : "Blog Created Successfully",
    data    : result
  })).catch(err => console.log(`Error: ` + err))

  next();
};
