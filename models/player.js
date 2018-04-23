'use strict';

const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  userName: { type: String, unique: true, required: true },
  skillRating: { type: Number },
  roles: { type: Array },
  heroPool: {type: Array},
  bio: {type: String}
});

playerSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Player', playerSchema);
