/*
 * Author: Sultan Ahmed Sanjar
 * Description: this is index file for the blog project it will handle all the back end files
 * Date: 2023-06-24
 * Copyright:  sultan@232
 */

// dependencies

// internal imports
const register = require("./pages/register");
const login = require("./pages/login");
const cookie = require("./pages/cookies");
const logOut = require("./pages/logout");
const { posts, post, uploadMiddleware } = require("./pages/post");
const postPage = require('./pages/PostSinglePage')
const UpPost = require('./pages/updatePost')

// external imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookie_Parser = require("cookie-parser");

// configuring the dotevn file
dotenv.config();

// configuring the main app
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookie_Parser());
app.use(express.static(__dirname + "/../uploads/"));
// app routes

// registration routes
app.post("/register", register);

// log in route
app.post("/login", login);

// get the blog  app information

app.get("/profile", cookie);

// making the log out

app.post("/logout", logOut);

app.get("/post", posts);

// making the posting routes for users

app.post("/post", uploadMiddleware.single("file"), post);

app.get('/post/:id' , postPage)

app.put('/post',uploadMiddleware.single('file'), UpPost )

// connecting the back end data base server

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Database Connected Successfully"))
  .catch(err => {
    console.log(err);
  });

// finally listening the app
app.listen(process.env.APP_PORT, () => {
  console.log(`listening on port ${process.env.APP_PORT}`);
});
