/*
 * Author: Sultan Ahmed Sanjar
 * Description: this is post file . this file will recive users uploaded information to complete the post
 * Date: 2023-06-28
 * Copyright:  sultan@232
 */

// dependencies

// internal imports
const Post = require("../models/postSchema");
// external imports

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { create } = require("domain");

// making the upload path

const uploadMiddleware = multer({ dest: "../uploads/" });

// making the post function

async function post(req, res) {
  try {
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const extName = parts[parts.length - 1];
      var newPath = path + "." + extName;
      fs.renameSync(path, newPath);
    } else {
      res.status(401).json("could not create Please provide a picture  ");
    }
    var newPost;
    const { title, summary, content } = req.body;

    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET_KEY, {}, (err, info) => {
      if (err) {
        res.status(500).json({ Error: `Internal Server Problem` });
      } else {
        newPost = new Post({
          title,
          summary,
          content,
          file: newPath,
          author: info.id,
        });
      }
    });

    const savedpost = await newPost.save();

    if (savedpost) {
      res.status(200).json({ savedpost });
    } else {
      res.status(500).json({ Error: `Could not create post ` });
    }
  } catch (err) {
    console.log(err);
  }
}

async function posts(req, res) {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
}

module.exports = {
  post,
  uploadMiddleware,
  posts,
};
