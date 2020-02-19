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
        { expiresIn: '1d' },
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
// POST /auth/login
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

  // Set JWT
  const payload = {
    user: {
      id: user.id
    }
  };

  jwt.sign(payload, process.env.TOKEN, { expiresIn: '24h' }, (error, token) => {
    if (error) throw error;
    console.log('token signed, sending token...');
    res.json({ token, username: user.username, userId: user._id });
  });
});

// Forgot password
// POST /auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Check is user email is in the db
  let user = await User.findOne({ email });

  if (!user) {
    console.warn('user does not exist');
    res.status(400).json({ message: 'no user for that email' });
  }

  // Set JWT
  const payload = {
    user: {
      id: user.id
    }
  };

  // Synchronous usage of jwt.sign() - returns a string
  const emailToken = jwt.sign(payload, process.env.TOKEN, { expiresIn: '1d' });

  // Check if prod and construct forgot password link
  let forgotPasswordUrl;
  if (process.env.NODE_ENV === 'production') {
    forgotPasswordUrl = `https://onerandomsample.com/#/new-password/${emailToken}`;
  } else {
    forgotPasswordUrl = `http://localhost:3000/#/new-password/${emailToken}`;
  }

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: user.email,
      from: 'contact@onerandomsample.com',
      subject: 'Reset Password',
      text: 'Please click the link to reset your password',
      html: `<p>Please click the link to <strong><a href='${forgotPasswordUrl}'>reset your password</a></strong></p>`
    };
    sgMail.send(msg);
    res.status(200).json({ message: 'ok sent email' });
  } catch (error) {
    console.warn('error sending email with sendgrid');
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// GET /auth/new-password
router.get('/new-password', (req, res, next) => {
  const emailToken = req.header('x-auth-token');

  if (!emailToken) {
    return res.status(401).json({ error: 'no token' });
  }

  // Verify token
  try {
    const decodedToken = jwt.verify(emailToken, process.env.TOKEN);

    return res
      .status(200)
      .json({ message: 'email token valid', token: decodedToken });
  } catch (error) {
    console.error('error with token verification');
    res.status(401).json({ message: 'token is not valid' });
  }
});

// POST /auth/new-password
router.post('/new-password', async (req, res, next) => {
  const emailToken = req.header('x-auth-token');
  const newPassword = req.body.password;

  if (!newPassword || !emailToken) {
    res.status(401).json({ message: 'invalid credentials' });
  }

  // Verify token
  try {
    const decodedToken = jwt.verify(emailToken, process.env.TOKEN);
    // Hash and salt new password
    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password in db
    let user = await User.findByIdAndUpdate(
      decodedToken.user.id,
      {
        password: hashedPassword
      },
      { new: true }
    );

    return res.status(200).json({ message: 'successfully updated password' });
  } catch (error) {
    console.error('error with token verification');
    res.status(401).json({ message: 'token is not valid' });
  }
});

module.exports = router;
