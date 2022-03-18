const express = require("express");
const Card = require("../models/card");

const cardRoutes = express.Router();

// Get all Cards
cardRoutes.route("/cards").get(async (req, res) => {
  const cards = await Card.find();
  res.json(cards);
});

// Get a specific Card by ID
cardRoutes.route("/cards/:id").get(async (req, res) => {
  const card = await Card.findById(req.params.id);
  res.json(card);
});

// Create new Card
cardRoutes.route("/cards/add").post(async (req, res) => {
  const newCard = new Card({
    frontText: req.body.frontText,
    backText: req.body.backText,
    active: true,
  });

  await newCard.save();
  res.json(newCard);
});

// Update a Card by ID
cardRoutes.route("/cards/update/:id").post(async (req, res) => {
  const card = await Card.findById(req.params.id);
  const newValues = {
    frontText: req.body.frontText,
    backText: req.body.backText,
    active: req.body.active,
  };

  card.set(newValues);
  await card.save();

  res.json(card);
});

// Delete a Card
cardRoutes.route("/cards/remove/:id").delete(async (req, res) => {
  const card = await Card.findById(req.params.id);
  await card.remove();
  console.log("1 document deleted");
  res.sendStatus(200);
});

module.exports = cardRoutes;
