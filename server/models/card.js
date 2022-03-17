const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  frontText: {
    type: String,
    required: true,
    maxLength: 300,
  },
  backText: {
    type: String,
    required: true,
    maxLength: 300,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Card", cardSchema);
