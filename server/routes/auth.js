const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

const authMiddlware = require('../helpers/auth');

const { check, validationResult } = require('express-validator');

const User = require('../models/User');

router.get('/private', authMiddlware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log('error with db connection', error.message);
    res.status(500).send('server error');
  }
});

// Register user
router.post(
  '/register',
  [
    check('username', 'name is required')
      .not()
      .isEmpty(),
    check('email', 'please enter valid email').isEmail()
  ],
  async (req, res) => {
    console.log('in register', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      // Check if user already exists
      if (user) {
        return res.status(400).json({ msg: 'This email already exists' });
      }

      user = new User({
        username,
        email,
        password
      });

      // Encrypt password
      // Create salt with 12 rounds
      const salt = await bcrypt.genSalt(12);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // Set JWT
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.TOKEN,
        { expiresIn: 3600 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log('error!!');
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'no user with that email' });
  }

  // Check password
  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    return res.status(400).json({ message: 'bad password' });
  }
  console.log('passwords match, signing token...');

  // Set JWT
  const payload = {
    user: {
      id: user.id
    }
  };

  jwt.sign(payload, process.env.TOKEN, { expiresIn: 3600 }, (error, token) => {
    if (error) throw error;
    console.log('token signed, sending token...');
    res.json({ token, username: user.username });
  });
});

// Forgot password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Check is user email is in the db
  let user = await User.findOne({ email });

  if (!user) {
    console.warn('user does not exist');
    res.status(400).json({ message: 'no user for that email' });
  }

  // if so then send email
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: user.email,
      from: 'test@example.com',
      // from: 'stachnikmichal@gmail.com',
      subject: 'Reset Password',
      text: 'Please click the link to reset your password',
      html:
        '<strong>Please click the link to <a href="#>reset your password</a></strong>'
    };
    sgMail.send(msg);
    res.status(200).json({ message: 'ok sent email' });
  } catch (error) {
    console.warn('error sending email with sendgrid');
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
