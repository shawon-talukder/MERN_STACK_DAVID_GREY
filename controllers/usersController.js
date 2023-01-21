/*
 *
 *
 ------->Title: 
 ->Description: 
 ------>Author: Shawon Talukder
 -------->Date: MM/DD/2023
 *
 *
 */

const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const User = require("../models/User");
const Note = require("../models/Note");

//GET method to get all users, to get /users, access private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -__v").lean();
  if (!users?.length > 0) {
    return res.status(400).json({ message: "No user Found" });
  }
  res.status(200).json(users);
});

//POST method to POST all users, to POST /users, access private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  //check data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  //check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username!" });
  }

  //hash pass
  const hashedPass = await bcrypt.hash(password, 10);

  //define user object
  const userObj = {
    username,
    password: hashedPass,
    roles,
  };

  //save it to the database
  const user = await User.create(userObj);

  if (user) {
    res.status(201).json({ message: "New user created!" });
  } else {
    res.status(500).json({ message: "There is a server side error!" });
  }
});

//UPDATE method to UPDATE all users, to UPDATE /users, access private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  const user = await User.findById({ _id: id }).exec();
  console.log(user);
  //user not found
  if (!user) {
    return res.status(400).json({ message: "User not found!" });
  }

  //check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username!" });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  //save it to the database
  const updatedUser = await user.save();
  console.log(updatedUser);
  res.status(200).json({ message: `${updatedUser.username} is updated!` });
});

//DELETE method to DELETE all users, to DELETE /users, access private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User Id required!" });
  }
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "user not found!" });
  }

  const note = await Note.findOne({ user: id }).exec();

  if (note) {
    return res.status(400).json({ message: "User has assigned notes" });
  }

  const result = await user.deleteOne();

  const successReply = `username: ${result.username} with id: ${result._id} deleted!`;

  res.status(200).json({ message: successReply });
});

//export
module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
