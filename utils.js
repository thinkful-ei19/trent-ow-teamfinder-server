'use strict';

const mongoose = require('mongoose');

const { DATABASE_URL } = require('./config');
const Player = require('./models/player');

const seedPlayers = require('./db/seed/players');

// seed production db 'mongodb://tdunk:dev@ds255889.mlab.com:55889/ow-teamfinder-db-trent'
mongoose.connect('mongodb://tdunk:dev@ds255889.mlab.com:55889/ow-teamfinder-db-trent')
  .then(() => Player.find())
  .then(data => {
    return data.map(obj => {
      const newObj = {
        roles: obj.roles,
        heroPool: obj.heroPool,
        username: obj.username, 
        password: obj.password, 
        skillRating: obj.skillRating,
        email: 'testemail@test.com'
      };
      return newObj;
    });
  })
  .then(data => console.log(JSON.stringify(data, null, '\t')));