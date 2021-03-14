const { Schema, model } = require("mongoose");

const BlogPost = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("BlogPost", BlogPost);
