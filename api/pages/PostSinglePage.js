/*
 * Author: Sultan Ahmed Sanjar
 * Description: this fie will create backend for each post
 * Date: 2023-07-04
 * Copyright:  sultan@232
 */

// dependencies

// internal imports
const Post = require("../models/postSchema");

// the final post page function

async function postPage(req, res) {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.status(200).json(postDoc);
}

// exporting the post page function

module.exports = postPage;
