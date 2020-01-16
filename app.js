const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const polls = require('./routes/polls');
const auth = require('./routes/auth');

require('dotenv').config();

const DB_PATH = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@ors-wbspk.mongodb.net/test?retryWrites=true&w=majority`;

const connectToDB = async () => {
  try {
    console.log('attempting to login with:');
    console.log('process.env.DB_USER: ', process.env.DB_USER);
    console.log('process.env.DB_USER: ', process.env.DB_PASS);
    await mongoose.connect(DB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to mongodb...');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const app = express();

connectToDB();

app.use(express.json({ extended: false }));

app.use('/polls', polls);
app.use('/auth', auth);

// Serve for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on ${PORT}`));
