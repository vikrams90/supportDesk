const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add name"],
  },
  email: { type: String, required: [true, "please add email"] },
  password: { type: String, required: [true, "please add password"] },
  isAdmin: { type: Boolean, required: true, default : false },
});


module.exports = mongoose.model("user", userSchema)