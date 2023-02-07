/*
 *
 *
 ------->Title: authRouter
 ->Description: 
 ------>Author: Shawon Talukder
 -------->Date: 02/07/2023
 *
 *
 */

//dependencies
const express = require("express");
const { login, refresh, logout } = require("../controllers/authController");
const loginLimiter = require("../middleware/loginLimiter");

//model scaffolding
const router = express.Router();

// Model Structure
router.route("/").post(loginLimiter, login);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);

//export model
module.exports = router;
