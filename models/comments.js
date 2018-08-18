const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  _target: { type: mongoose.Schema.Types.ObjectId, ref: 'deck', required: true },
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  content: { type: String, required: true },
  _parent: { type: mongoose.Schema.Types.ObjectId, ref: 'comment', default: null },
  ut: { type: Date, default: Date.now }
})

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;
