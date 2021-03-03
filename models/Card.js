const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    minlength: 1
  },
  definition: {
    type: String,
    required: true,
    minlength: 1
  },
});

const Card = mongoose.model('Card', cardSchema);

module.exports.cardSchema = cardSchema;
module.exports.Card = Card;
