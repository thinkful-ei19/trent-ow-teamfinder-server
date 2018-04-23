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
  const {userName, skillRating, roles, heroPool, bio} = req.body;
  const newPlayer = {
    userName,
    skillRating,
    roles,
    heroPool,
    bio
  };
  return Player.create(newPlayer)
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
