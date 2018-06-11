const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post     = require('../../models/Post');

// @route  GET api/posts
// @acces  Public
router.get('/', (req, res) => res.json({
  message : "Hello from posts router"
}));

// @route  POST api/posts
// @desc   Create post
// @acces  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});


module.exports = router;
