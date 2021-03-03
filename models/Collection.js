const mongoose = require('mongoose');
const { cardSchema } = require('./Card');

const collectionSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 1 },
  cards: { type: [cardSchema] }
});

const Collection = mongoose.model('Collection', collectionSchema, "flashcards");

exports.Collection = Collection;