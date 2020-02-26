const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

router.post('/', async (req, res) => {
  const { email, message } = req.body;

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'contact@onerandomsample.com',
      from: email,
      subject: 'Contact',
      text: message,
      html: `<p>${message}</p>`
    };
    sgMail.send(msg);
    res.status(200).json({ message: 'ok sent email to contact' });
  } catch (error) {
    console.warn('error sending email with sendgrid to contact');
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
