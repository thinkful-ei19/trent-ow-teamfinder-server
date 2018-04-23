'use strict';

const mongoose = require('mongoose');

const { DATABASE_URL } = require('./config');
const Player = require('./models/player');

const seedPlayers = require('./db/seed/players');


mongoose.connect(DATABASE_URL)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Player.insertMany(seedPlayers);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });