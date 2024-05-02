/*
 * Author: Sultan Ahmed Sanjar
 * Description: this is the schema file for the db server . it will create a schema and a model then import it index file
 * Date: 2023-06-24
 * Copyright:  sultan@232
 */

// dependencies

// external imports

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      min: 4,
      max: 32,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    number: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timelapse: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
