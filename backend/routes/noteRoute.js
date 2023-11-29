const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/authmiddleware");
const {
  getNote,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");

router.route("/:ticketId").get(auth, getNote).post(auth, createNote);
router.route("/:ticketId/:noteId").delete(auth, deleteNote).put(auth, updateNote);

module.exports = router;
