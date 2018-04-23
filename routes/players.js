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

module.exports = router;
