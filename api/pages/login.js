/*
 * Author: Sultan Ahmed Sanjar
 * Description: this is the regsiter file this file will define how to register a file and finally export it index file
 * Date: 2023-06-24
 * Copyright:  sultan@232
 */

// dependencies

// internal imports

const User = require("../models/userSchema");

// external imports for

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register function

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const UserDoc = await User.findOne({ username });

    if (UserDoc) {
      const MatchPass = bcrypt.compareSync(password, UserDoc.password);

      if (MatchPass) {
        // logged in
        jwt.sign(
          { username, id: UserDoc._id },
          process.env.SECRET_KEY,
          {},
          (err, token) => {
            if (err) {
              throw err.message;
            } else {
              res.status(200).cookie("token", token).json({
                message: ` logged in successfully`,
                id: UserDoc._id,
                username,
              });
            }
          }
        );
      } else {
        // logging failed
        res.status(500).json({ message: "failed to login" });
      }
    } else {
      res.status(500).json({ message: `Authentication problem` });
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = login;
