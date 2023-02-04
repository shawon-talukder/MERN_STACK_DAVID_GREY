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

// Dependencies
const express = require("express");
const {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");
// Model Scaffolding
const router = express.Router();

// Model Structure
router
  .route("/")
  .get(getAllNotes)
  .post(createNewNote)
  .patch(updateNote)
  .delete(deleteNote);

// Export Model
module.exports = router;
