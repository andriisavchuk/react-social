const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post     = require('../../models/Post');

// Validation
const validatePostInput = require('../../validation/post');

// @route  GET api/post
// @desc   GET posts
// @acces  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: 'No posts found.' }));
  }
);

// @route  GET api/post
// @desc   GET posts
// @acces  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'No post found with current ID.' }));
  }
);

// @route  POST api/post
// @desc   Create post
// @acces  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(404).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});

module.exports = router;