const express = require('express');
const mongoose = require('mongoose');
const polls = require('./routes/polls');
const auth = require('./routes/auth');

require('dotenv').config();

const DB_PATH = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@ors-wbspk.mongodb.net/test?retryWrites=true&w=majority`;

const connectToDB = async () => {
  try {
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on ${PORT}`));
