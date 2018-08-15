const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  name: { type: String, index: true },
  investigator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'card', required: true },
  cards: [{
    card_id: { type: mongoose.Schema.Types.ObjectId, ref: 'card', required: true },
    qty: { type: Number, default: 1 },
    required: { type: Boolean, default: false }
  }],
  ut: { type: Date, default: Date.now },
  cmt_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }]
});

const Deck = mongoose.model('deck', deckSchema);
module.exports = Deck;
