'use strict';

const {Strategy: LocalStrategy} = require('passport-local');

const Player = require('../models/player');

const localAuth = new LocalStrategy((userName, password, done) => {
  return Player.findOne({ userName })
    .then(player => {
      if (!player) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username',
          location: 'username'
        });
      }
      return player.validatePassword(password)
        .then(isValid => {
          if (!isValid) {
            return Promise.reject({
              reason: 'LoginError',
              message: 'Incorrect password',
              location: 'password'
            });
          }
          return done(null, player);
        });
    }) 
    .catch(err => {
      if (err.reason === 'LoginError') {
        return done(null, false);
      }
      return done(err);
    });
});

module.exports = localAuth; 