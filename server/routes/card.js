const express = require("express");
const Card = require("../models/card");

const cardRoutes = express.Router();

// Get a specific Card by ID
cardRoutes.route("/cards/:id").get(async (req, res) => {
  const card = await Card.findById(req.params.id);
  res.json(card);
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

module.exports = cardRoutes;
