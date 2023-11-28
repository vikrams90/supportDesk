const ticketCollection = require("../models/ticketModel");
const userCollection = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const getSingleTicket = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await userCollection.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const tickets = await ticketCollection.findById(id);

  if (!tickets) {
    res.status(404);
    throw new Error("ticket not found");
  }

  if (tickets.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(tickets);
});

const getTicket = asyncHandler(async (req, res) => {
  const user = await userCollection.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const tickets = await ticketCollection.find({ user: req.user._id });
  res.status(200).json(tickets);
});

const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error("please fill all details");
  }

  const user = await userCollection.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const ticket = await ticketCollection.create({
    product,
    description,
    user: req.user._id,
    status: "new",
  });

  res.status(201).json(ticket);
});

const deleteTicket = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await userCollection.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const tickets = await ticketCollection.findById(id);
  if (!tickets) {
    res.status(404);
    throw new Error("ticket not found");
  }

  if (tickets.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const result = await ticketCollection.findByIdAndDelete(id);
  if (!result) {
    res.status(401);
    throw new Error("unable to delete");
  }
  res.status(200).json({
    msg: "deleted succesfully",
  });
});

module.exports = {
  getSingleTicket,
  getTicket,
  createTicket,
  deleteTicket,
};
