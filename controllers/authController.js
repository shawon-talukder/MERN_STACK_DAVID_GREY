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

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");

const authController = {};

//post method for login
authController.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        roles: foundUser.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  //create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
});

//refresh token generate
authController.refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, data) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      const foundUser = await User.findOne({ username: data.username }).exec();
      if (!foundUser) return res.status(401).json({ message: "Unauthorized!" });
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    })
  );
};

authController.logout = (req, res) => {
  //check if there is any cookie
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    //no content = 204
    return res.sendStatus(204);
  }
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
  res.json({ message: "Cookie cleared" });
};

module.exports = authController;
