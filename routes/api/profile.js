const express = require('express');
const router  = express.Router();

// @route  GET api/profile
// @acces  Public
router.get('/', (req, res) => res.json({
  message : "Hello from profile router"
}));

module.exports = router;
