/*
 *
 *
 ------->Title: user model
 ->Description: this file consists of mongoose User model.
 ------>Author: Shawon Talukder
 -------->Date: 01/17/2023
 *
 *
 */

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      // enum: ["Employee", "Admin"],
      default: "Employee",
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
