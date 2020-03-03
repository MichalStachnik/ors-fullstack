const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const polls = require('./routes/polls.js');
const auth = require('./routes/auth.js');

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

connectToDB();

const PORT = process.env.PORT || 5000;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cors());

    server.use(express.json({ extended: false }));

    server.use('/polls', polls);
    server.use('/auth', auth);

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`listening on ${PORT}`);
    });
  })
  .catch(ex => {
    console.error('error preparing application');
    console.error(ex);
    console.error(ex.stack);
    process.exit(1);
  });
