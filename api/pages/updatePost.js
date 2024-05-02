/*
 * Author: Sultan Ahmed Sanjar
 * Description: this file will update the post . and control all the functionality for updating
 * Date: 2023-07-04
 * Copyright:  sultan@232
 */

// dependencies

// internal imports

const Post = require("../models/postSchema");

// external imports

const jwt = require("jsonwebtoken");
const fs = require("fs");

// making the function for updating the existing post

async function UpPost(req, res) {
  try {
    var newPath;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const extName = parts[parts.length - 1];
      newPath = path + "." + extName;
      fs.renameSync(path, newPath);
    }

    const { title, summary, content, id } = req.body;

    const postDoc = await Post.findById(id);
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET_KEY, {}, (err, info) => {
      if (err) {
        res.status(500).json({ Error: `Internal Server Problem` });
      }
    });
    const savedDoc = await postDoc.updateOne({
      title,
      summary,
      content,
      file: newPath ? newPath : postDoc.file,
    });
    if (savedDoc) {
      res.status(200).json(postDoc);
    } else {
      res.status(401).json("Please provide altleast One perameters");
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = UpPost;
