const userCollection = require("../models/userModel");
const ticketCollection = require("../models/ticketModel");
const noteCollection = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

const getNote = asyncHandler(async (req, res) => {
  const user = await userCollection.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }

  const ticket = await ticketCollection.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const notes = await noteCollection.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const user = await userCollection.findById(req.user._id);
  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }

  const text = req.body.text;

  if (!text) {
    res.status(401);
    throw new Error("please fill all details");
  }

  const ticket = await ticketCollection.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  console.log({
    text,
    user: req.user._id,
    ticket: ticket._id,
  });

  const addNote = await noteCollection.create({
    text,
    user: req.user._id,
    ticket: ticket._id,
  });

  if (!addNote) {
    res.status(401);
    throw new Error("req not processed");
  }

  res.status(200).json(addNote);
});

const deleteNote = asyncHandler(async (req, res) => {
  const ticket = await ticketCollection.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const note = await noteCollection.findById(req.params.noteId);

  if (!note) {
    res.status(404);
    throw new Error("note not found");
  }

  const deleteNote = await noteCollection.findByIdAndDelete(req.params.noteId);

  if (!deleteNote) {
    res.status(401);
    throw new Error("can not process reqest");
  }

  res.status(200).json({
    msg: "succesfully deleted",
  });
});


const updateNote = asyncHandler(async(req,res)=>{

    const ticket = await ticketCollection.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const note = await noteCollection.findById(req.params.noteId);

  if (!note) {
    res.status(404);
    throw new Error("note not found");
  }

  const result = await noteCollection.findByIdAndUpdate(req.params.noteId,req.body,{new:true});

  if (!result) {
    res.status(401);
    throw new Error("can not process reqest");
  }

  res.status(200).json(result);



})


module.exports = {
  getNote,
  createNote,
  deleteNote,
  updateNote
};
