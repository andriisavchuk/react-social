const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @route  GET api/user
// @acces  Public
router.get('/', (req, res) =>
  res.json({
    message: 'Hello from user router'
  })
);

// @route  POST api/user/signup
// @desc   User registration
// @acces  Public
router.post('/signup', (req, res, next) => {
  const { errors, isValid } = validateSignupInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = 'User with current email already exists.';
      return res.status(409).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: 200, // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route  POST api/user/login
// @desc   Login User / Returning JWT Token
// @acces  Public
router.post('/login', (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then((user) => {
    //Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        const payload = {
          id: user.id,
          name: user.name,
          surname: user.surname,
          avatar: user.avatar
        };

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password is incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route  GET api/user/current
// @desc   Return current user
// @acces  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      surname: req.user.surname,
      email: req.user.email
    });
  }
);

module.exports = router;