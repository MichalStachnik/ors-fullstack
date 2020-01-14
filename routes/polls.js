const express = require('express');
const router = express.Router();
const authMiddleware = require('../helpers/auth');
const Poll = require('../models/Poll');

// Create poll
router.post('/', authMiddleware, async (req, res, next) => {
  console.log('in POST /polls with req.user: ', req.user);
  const { question, options } = req.body;
  console.log('question: ', question);
  console.log('options: ', options);

  try {
    let poll = new Poll({
      user: req.user,
      question,
      options,
      totalVotes: 0,
      date: new Date().toISOString(),
      comments: []
    });

    await poll.save();

    res.status(200).json({ message: 'poll saved' });
  } catch (error) {
    console.log('error saving poll');
    console.error(error);
  }
});

// Get all polls
router.get('/', async (req, res, next) => {
  try {
    let polls = await Poll.find({});
    if (polls) {
      res.status(200).json({ polls });
    }
  } catch (error) {
    console.log('error fetching polls');
    console.error(error.message);
    throw error;
  }
});

// Get single poll
// Proxy error?
router.get('/:pollId', async (req, res, next) => {
  console.log('in server with: ', req.params);
  try {
    let poll = await Poll.findById(req.params.pollId);

    res.status(200).json({ poll });
  } catch (error) {
    console.log('error fetching single poll');
    console.error(error.message);
    throw error;
  }
});

// Send one vote
router.get('/:pollId/:option', async (req, res, next) => {
  try {
    let poll = await Poll.findById(req.params.pollId);

    console.log('req.params', req.params);
    poll.options.map(option => {
      // console.log('option.option', option.option);
      // console.log('req.params.option', req.params.option);
      if (option.option === req.params.option) {
        console.log('upping it');
        option.voteCount++;
      }
    });

    await poll.save();
    console.log('updated vote count and saved');
    res.status(200);
  } catch (error) {
    console.log('error sending vote');
    console.error(error.message);
    throw error;
  }
});

module.exports = router;
