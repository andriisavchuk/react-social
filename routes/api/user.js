const express   = require('express');
const router    = express.Router();
const gravatar  = require('gravatar');
const bcrypt    = require('bcryptjs');

// Load User model
const User = require('../../models/User');

// @route  GET api/user
// @acces  Public
router.get('/', (req, res) => res.json({
  message: "Hello from user router"
}));

// @route  POST api/user/signup
// @desc   User registration
// @acces  Public
router.post('/signup', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(409).json({ email: 'User with current email already exists.' })
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: 200,  // Size
          r: 'pg', // Rating
          d: 'mm'  // Default
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
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
});

// @route  POST api/user/login
// @desc   Login User / Returning JWT Token
// @acces  Public
router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email })
    .then(user => {
      //Check for user
      if (!user) {
        return res.status(404).json({ email: 'User not found' });
      }

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            res.json({ message: 'Success' });
          } else {
            return res.status(400).json({ password: 'Password is incorrect' });
          }
        })
    })
});

module.exports = router;
