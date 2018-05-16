'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const playerSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: {type: String, required: true},
  skillRating: { type: Number },
  roles: { type: Array },
  heroPool: {type: Array},
  email: {type: String}
});

playerSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  }
});

playerSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

playerSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('Player', playerSchema);
