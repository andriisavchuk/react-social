const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post     = require('../../models/Post');

// Profile model
const Profile     = require('../../models/Profile');

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

// @route  GET api/post/:id
// @desc   GET post by ID
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

// @route  POST api/post/:id
// @desc   Delete post
// @acces  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ notauthorized: 'User is not authorized.' });
          }

          // Delete post
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ nopostfound: 'No post found.' }));
    })
});

// @route  POST api/post/like:id
// @desc   Like post
// @acces  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: 'User already liked this post'});
          }
          // Add user id to likes array
          post.likes.unshift({ user: req.user.id});

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ nopostfound: 'No post found.' }));
    })
});

// @route  POST api/post/unlike:id
// @desc   Unlike post
// @acces  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notliked: 'You have not yet liked this post.'});
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ nopostfound: 'No post found.' }));
    })
});

// @route  POST api/post/comment/:id
// @desc   Add comment to post
// @acces  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(404).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }
      // Add to comments array
      post.comments.unshift(newComment);

      // Save
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ nopostfound: 'No post found.' }));
});


module.exports = router;