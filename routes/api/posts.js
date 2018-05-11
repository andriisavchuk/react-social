const express = require('express');
const router  = express.Router();

// @route  GET api/posts
// @acces  Public
router.get('/', (req, res) => res.json({
  message : "Hello from posts router"
}));

module.exports = router;
