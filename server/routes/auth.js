const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        return res.status(400).json({ message: 'This email already exists' });
      }

      // Send email to user
      try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: 'test@example.com',
          from: 'test@example.com',
          subject: 'Sending with Twilio SendGrid is Fun',
          text: 'and easy to do anywhere, even with Node.js',
          html: '<strong>and easy to do anywhere, even with Node.js</strong>'
        };
        sgMail.send(msg);
        console.log('sent');
      } catch (error) {
        console.log('error sending email with sendgrid');
        throw error;
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

      console.log('right before user save with id: ', user.id);
      await user.save();
      console.log('user saved with id: ', user.id);

      // Set JWT
      // const payload = {
      //   user: {
      //     id: user.id
      //   }
      // };

      // jwt.sign(
      //   payload,
      //   process.env.TOKEN,
      //   { expiresIn: 3600 },
      //   (error, token) => {
      //     if (error) throw error;
      //     res.json({ token });
      //   }
      // );
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

module.exports = router;
