/*
 * Author: Sultan Ahmed Sanjar
 * Description: this is the log out file it will create function for logging out from blog app
 * Date: 2023-06-26
 * Copyright:  sultan@232
 */

// dependencies

// internal imports

function logOut(req, res) {
  res.cookie("token", "").json({ message: `Logged out ` });
}

module.exports = logOut;
