/*
 *
 *
 ------->Title: routes file
 ->Description: this file is to handle all routes
 ------>Author: Shawon Talukder
 -------->Date: 01/16/2023
 *
 *
 */

// Dependencies
const express = require("express");
const path = require("path");

// Model Scaffolding
const router = express.Router();

// Model Structure
router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "index.html"));
});

// Export Model
module.exports = router;
