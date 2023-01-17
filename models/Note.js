/*
 *
 *
 ------->Title: note model
 ->Description: this file consists of mongoose note model to structure notes.
 ------>Author: Shawon Talukder
 -------->Date: 01/17/2023
 *
 *
 */

const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
