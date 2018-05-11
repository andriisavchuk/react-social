const express = require('express');
const router  = express.Router();

// @route  GET api/user
// @acces  Public
router.get('/', (req, res) => res.json({
  message: "Hello from user router"
}));

module.exports = router;
