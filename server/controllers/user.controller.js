const Card = require("../models/card");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.userCards = async (req, res) => {
  const query = { user: req.userId };
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
  await card.remove();
  console.log("1 document deleted");
  res.sendStatus(200);
};
