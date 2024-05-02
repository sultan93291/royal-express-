/*
 * Author: Sultan Ahmed Sanjar
 * Description: this is the schema file for the db server . it will create a schema and a model then import it index file
 * Date: 2023-06-24
 * Copyright:  sultan@232
 */

// dependencies

// external imports

const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 80,
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      min: 5,
    },
    file: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId , ref:'user' ,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
