const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const User = require("../models/User");
const verify = require("./verifyToken");

// Gets a specific note
router.get("/:noteId", verify, async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    res.json(note);
  } catch (err) {
    res.json({ message: err });
  }
});

// Gets back all notes
router.get("/", verify, async (req, res) => {
  try {
    const notes = await Note.find({
      creatorId: req.user._id,
    });
    res.json(notes);
  } catch (err) {
    res.json({ message: err });
  }
});

// Create a note
router.post("/", verify, async (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    description: req.body.description,
    creatorId: req.user._id,
  });
  newNote
    .save()
    .then((note) => res.json(note))
    .catch((err) => console.log(err));
});

// Delete a specific note
router.delete("/:noteId", verify, async (req, res) => {
  try {
    const removedNote = await Note.remove({ _id: req.params.noteId });
    res.json(removedNote);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update a note
router.patch("/:noteId", verify, async (req, res) => {
  try {
    const updatedNote = await Note.updateOne(
      { _id: req.params.noteId },
      { $set: { title: req.body.title, description: req.body.description } }
    );
    res.json(updatedNote);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
