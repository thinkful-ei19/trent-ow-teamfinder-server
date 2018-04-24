'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Player = require('../models/player');


router.get('/players', (req,res,next) => {
  return Player.find()
    .then(result => {
      res.json(result);
    });
  
});

router.post('/players', (req,res,next) => {
  const requiredFields = ['userName', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body.players));

  if (missingField) {
    const err = new Error(`Missing '${missingField}' in request body`);
    err.status = 422;
    return next(err);
  }
  const stringFields = ['userName', 'password'];
  const notString = stringFields.find(field => field in req.body.players && typeof req.body.players[field] !== 'string');
  if (notString) {
    const err = new Error('Incorrect field type: expected string');
    err.status = 422;
    return next(err);
  }
  
  const trimmedFields = ['userName', 'password'];
  const nonTrimmedFields = trimmedFields.find(field => req.body.players[field].trim() !== req.body.players[field]);
  if (nonTrimmedFields) {
    const err = new Error('Cannot start or end with whitespace');
    err.status = 422;
    return next(err);
  }

  const {userName, password, skillRating, roles, heroPool, bio} = req.body.players;

  
  return Player.hashPassword(password)
    .then(digest => {
      const newPlayer = {
        userName,
        password: digest,
        skillRating: Number(skillRating),
        roles,
        heroPool,
        bio
      };
      return Player.create(newPlayer);
    })
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('The username already exists');
        err.status = 400;
      }
      next(err);
    });
});

module.exports = router;
