/*
 * Author: Sultan Ahmed Sanjar
 * Description: this is the regsiter file this file will define how to register a file and finally export it index file
 * Date: 2023-06-24
 * Copyright:  sultan@232
 */

// dependencies

// internal imports

const User = require("../models/userSchema");

// external imports

const bcrypt = require("bcrypt");

// register function

// making salt
const SALT = bcrypt.genSaltSync(10);

async function register(req, res) {
  try {
    const { username, password, number, name, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, SALT);
    const UserDoc = await User.create({
      name,
      number,
      email,
      username,
      password: hashedPassword,
    });
    res.status(200).json({ requestData: UserDoc });
    console.log(`User info : ${UserDoc} `);
  } catch (err) {
    res.status(500).json({ Error: `Authentication Problem` });
    console.log(err);
  }
}

// exporting the register function
module.exports = register;
