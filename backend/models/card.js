const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
  likes: {
    type: [mongoose.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
