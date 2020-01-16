const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user'
  // },
  question: {
    type: String,
    required: true
  },
  options: [
    {
      option: {
        type: String,
        required: true
      },
      voteCount: {
        type: Number,
        default: 0
      }
    }
  ],
  totalVotes: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments: {
    type: [String]
  }
});

module.exports = mongoose.model('poll', PollSchema);
