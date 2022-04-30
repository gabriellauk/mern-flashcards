const Card = require("../models/card");

exports.welcome = (req, res) => {
  res.status(200);
};

exports.activeCards = async (req, res) => {
  const query = { user: req.userId, active: true };
  const cards = await Card.find(query);
  res.status(200).json(cards);
};

exports.inactiveCards = async (req, res) => {
  const query = { user: req.userId, active: false };
  const cards = await Card.find(query);
  res.status(200).json(cards);
};

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
  const card = await Card.findById(req.params.id);
  if (!card.user.equals(req.userId)) {
    return res.sendStatus(403);
  }
  await card.remove();
  res.sendStatus(200);
};

exports.getSpecificCard = async (req, res) => {
  const card = await Card.findById(req.params.id);
  if (!card.user.equals(req.userId)) {
    return res.sendStatus(403);
  }
  res.status(200).json(card);
};

exports.updateCard = async (req, res) => {
  const card = await Card.findById(req.params.id);
  if (!card.user.equals(req.userId)) {
    return res.sendStatus(403);
  }
  const newValues = {
    frontText: req.body.frontText,
    backText: req.body.backText,
    active: req.body.active,
  };

  card.set(newValues);
  await card.save();

  res.status(200).json(card);
};

exports.updateCardStatus = async (req, res) => {
  const card = await Card.findById(req.params.id);
  if (!card.user.equals(req.userId)) {
    return res.sendStatus(403);
  }
  const newValue = {
    active: req.body.active,
  };

  card.set(newValue);
  await card.save();

  res.status(200).json(card);
};
