const express = require("express");
const router = express.Router();

const auth = require("../middleware/authmiddleware");

const {
  getSingleTicket,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController");

router.route("/:id").get(auth, getSingleTicket).delete(auth, deleteTicket).put(auth,updateTicket);

router.get("/", auth, getTicket);

router.post("/", createTicket);

router.use("/note", require("../routes/noteRoute"))
// router.use("/note/:ticketId", require("../routes/noteRoute"))

module.exports = router;
