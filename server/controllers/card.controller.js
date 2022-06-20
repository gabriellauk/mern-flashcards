const Card = require("../models/card");

// Fetch all active cards matching the user ID
exports.activeCards = async (req, res) => {
  const query = { user: req.userId, active: true };
  const cards = await Card.find(query);
  res.status(200).json(cards);
};

// Fetch all inactive cards matching the user ID
exports.inactiveCards = async (req, res) => {
  const query = { user: req.userId, active: false };
  const cards = await Card.find(query);
  res.status(200).json(cards);
};

// Save a new card
exports.addCard = async (req, res) => {
  const newCard = new Card({
    frontText: req.body.frontText,
    backText: req.body.backText,
    user: req.userId,
    active: true,
  });

  await newCard.save();
  res.status(200).json(newCard);
};

exports.deleteCard = async (req, res) => {
  // Fetch the specific card by ID
  const card = await Card.findById(req.params.id);
  // If the card's user ID does not match the user ID requested
  if (!card.user.equals(req.userId)) {
    // Return forbidden
    return res.sendStatus(403);
  }
  // Else, remove the card
  await card.remove();
  res.sendStatus(200);
};

exports.getSpecificCard = async (req, res) => {
  // Fetch the specific card by ID
  const card = await Card.findById(req.params.id);
  // If the card's user ID does not match the user ID requested
  if (!card.user.equals(req.userId)) {
    // Return forbidden
    return res.sendStatus(403);
  }
  res.status(200).json(card);
};

exports.updateCard = async (req, res) => {
  // Fetch the specific card by ID
  const card = await Card.findById(req.params.id);
  // If the card's user ID does not match the user ID requested
  if (!card.user.equals(req.userId)) {
    // Return forbidden
    return res.sendStatus(403);
  }
  const newValues = {
    frontText: req.body.frontText,
    backText: req.body.backText,
    active: req.body.active,
  };
  // Update the card with the new values
  card.set(newValues);
  await card.save();

  res.status(200).json(card);
};

// Updates card status to inactive or active
exports.updateCardStatus = async (req, res) => {
  // Fetch the specific card by ID
  const card = await Card.findById(req.params.id);
  // If the card's user ID does not match the user ID requested
  if (!card.user.equals(req.userId)) {
    // Return forbidden
    return res.sendStatus(403);
  }
  const newValue = {
    active: req.body.active,
  };
  // Update the card's status
  card.set(newValue);
  await card.save();

  res.status(200).json(card);
};
