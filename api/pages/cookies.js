/*
 * Author: Sultan Ahmed Sanjar
 * Description: this is the cookie file it will send the cookes to the user to avoid login every single time
 * Date: 2023-06-26
 * Copyright:  sultan@232
 */

// dependencies

// internal imports

// external imports
const jwt = require("jsonwebtoken");

// making the function for handling cookies

function cookie(req, res) {
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET_KEY, {}, (err, info) => {
    if (err) {
      res.status(500).json({ Error: `Internal Server Problem` });
    } else {
      res.status(200).json(info);
    }
  });
}

module.exports = cookie;
