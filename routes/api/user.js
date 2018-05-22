const express = require('express');
const router  = express.Router();

// Load User model
const User = require('../../models/User');

// @route  GET api/user
// @acces  Public
router.get('/', (req, res) => res.json({
  message: "Hello from user router"
}));

// @route  POST api/user
// @desc   User registration
// @acces  Public
router.post('/signup', (req, res, next) => res.json({
  
}));

module.exports = router;
