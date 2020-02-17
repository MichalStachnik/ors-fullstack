const express = require('express');
const router = express.Router();
const authMiddleware = require('../helpers/auth');

const Poll = require('../models/Poll');
const User = require('../models/User');

// Create one poll
router.post('/', authMiddleware, async (req, res, next) => {
  const { question, options } = req.body;

  try {
    let poll = new Poll({
      user: req.user.id,
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
    // Get most recent polls based on date
    let polls = await Poll.find({}).sort({ date: -1 });
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
router.get('/:pollId/vote/:option', authMiddleware, async (req, res, next) => {
  try {
    // Get the voter
    const theVoter = await User.findById(req.user.id);

    let poll = await Poll.findById(req.params.pollId);

    // Add a count to the chosen vote
    poll.options.map(option => {
      if (option.option === req.params.option) {
        option.voteCount++;
      }
    });

    // Add a count to total votes
    poll.totalVotes++;

    // Add user to voters array of poll
    poll.voters.push(theVoter);

    await poll.save();
    res.status(200).json({ message: 'success voting' });
  } catch (error) {
    console.log('error sending vote');
    console.error(error.message);
    throw error;
  }
});

// Create one comment
router.post('/:pollId/comment', authMiddleware, async (req, res, next) => {
  const { commentText, commentAuthor } = req.body;
  const userId = req.user.id;

  const comment = {
    authorId: userId,
    author: commentAuthor,
    comment: commentText
  };

  try {
    let poll = await Poll.findById(req.params.pollId);

    poll.comments.push(comment);

    // poll = await poll.save();
    await poll.save();

    res.status(200).json({ message: 'comment saved', poll });
  } catch (error) {
    console.log('error creating comment');
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

    res.status(200).json({ message: 'poll liked', poll });
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
    res.status(200).json({ message: 'poll disliked', poll });
  } catch (error) {
    console.log('error disliking poll');
    console.error(error.message);
    throw error;
  }
});

module.exports = router;
