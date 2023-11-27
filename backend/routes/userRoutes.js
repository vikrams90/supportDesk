const express = require("express");
const {
  registerUser,
  loginUser,
  hello,
} = require("../controllers/userControllers");
const auth = require("../middleware/authmiddleware");

const router = express.Router();


router.post("/register", registerUser);

router.get("/login", loginUser);

router.get("/hello", auth ,hello);

module.exports = router;
