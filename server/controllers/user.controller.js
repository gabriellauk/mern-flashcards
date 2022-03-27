const Card = require("../models/card");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.userCards = async (req, res) => {
  const cards = await Card.find();
  res.status(200).json(cards);
};


