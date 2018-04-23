'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const players = [
  {username: 'trent', skillRating: 2400},
  {username: 'user2', skillRating: 3000}
];

router.get('/players', (req,res,next) => {
  return res.json(players);
});

module.exports = router;
