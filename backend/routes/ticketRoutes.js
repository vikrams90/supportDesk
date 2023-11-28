const express = require("express");
const router = express.Router();

const auth = require("../middleware/authmiddleware");

const {
  getSingleTicket,
  getTicket,
  createTicket,
  deleteTicket,
} = require("../controllers/ticketController");

router.route("/:id").get(auth, getSingleTicket).delete(auth, deleteTicket);

router.get("/", auth, getTicket);

router.post("/", createTicket);

module.exports = router;
