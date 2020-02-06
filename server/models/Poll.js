const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = Schema({
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
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
      },
      voters: {
        type: Schema.Types.ObjectId,
        ref: 'user'
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
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  comments: [
    {
      authorId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      author: {
        type: String,
        required: true
      },
      comment: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  voters: [
    // {
    //   voterId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'user'
    //   }
    // }
    Schema.Types.ObjectId
  ]
});

module.exports = mongoose.model('poll', PollSchema);
