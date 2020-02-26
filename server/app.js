const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const sslRedirect = require('heroku-ssl-redirect');

// Routes
const polls = require('./routes/polls.js');
const auth = require('./routes/auth.js');
const contact = require('./routes/contact.js');

require('dotenv').config();

let DB_PATH = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@ors-wbspk.mongodb.net/test?retryWrites=true&w=majority`;

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Connected to mongodb...');
  } catch (error) {
    console.log('Error connecting to mongodb');
    console.error(error);
    process.exit(1);
  }
};

const app = express();

app.use(sslRedirect());

connectToDB();

app.use(express.json({ extended: false }));

app.use('/polls', polls);
app.use('/auth', auth);
app.use('/contact', contact);

// Serve for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on ${PORT}`));
