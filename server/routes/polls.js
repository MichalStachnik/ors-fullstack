const express = require('express');
const router = express.Router();
const authMiddleware = require('../helpers/auth');
const Poll = require('../models/Poll');

// Create one poll
router.post('/', authMiddleware, async (req, res, next) => {
  console.log('in POST /polls with req.user: ', req.user);
  const { question, options } = req.body;
  console.log('req.body', req.body);

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

// Get one poll
router.get('/:pollId', async (req, res, next) => {
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
router.get('/:pollId/vote/:option', async (req, res, next) => {
  try {
    let poll = await Poll.findById(req.params.pollId);

    console.log('req.params', req.params);
    poll.options.map(option => {
      if (option.option === req.params.option) {
        option.voteCount++;
      }
    });

    await poll.save();
    res.status(200).json({ message: 'updated vote count' });
  } catch (error) {
    console.log('error sending vote');
    console.error(error.message);
    throw error;
  }
});

// Create one comment
router.post('/:pollId/comment', async (req, res, next) => {
  const { comment } = req.body;

  try {
    let poll = await Poll.findById(req.params.pollId);
    poll.comments.push(comment);
    await poll.save();
    res.status(200).json({ message: 'comment saved' });
  } catch (error) {
    console.log('error fetching single poll');
    console.error(error.message);
    throw error;
  }
});

// Send one like
router.get('/:pollId/like', async (req, res, next) => {
  try {
    let poll = await Poll.findByIdAndUpdate(
      req.params.pollId,
      {
        $inc: { likes: 1 }
      },
      { new: true }
    );

    res.status(200).json({ msg: 'poll liked', poll });
  } catch (error) {
    console.log('error liking poll');
    console.error(error.message);
    throw error;
  }
});

// Send one dislike
router.get('/:pollId/dislike', async (req, res, next) => {
  try {
    let poll = await Poll.findByIdAndUpdate(
      req.params.pollId,
      {
        $inc: { dislikes: 1 }
      },
      {
        new: true
      }
    );
    res.status(200).json({ msg: 'poll disliked', poll });
  } catch (error) {
    console.log('error disliking');
    console.error(error.message);
    throw error;
  }
});

module.exports = router;
