const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "enter note"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "ticket",
  },
  isStaff: { 
    type: Boolean, 
    required: true, 
    default: false },
},{
    timestamps : true
});

module.exports = mongoose.model("note", noteSchema);
