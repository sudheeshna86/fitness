const mongoose = require('mongoose');

const userChallengeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
      required: true,
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },

    currentDay: {
      type: Number,
      default: 0,
    },

    progress: {
      type: Number,
      default: 0,
    },

    streak: {
      type: Number,
      default: 0,
    },

    completedDays: {
      type: [Number],
      default: [],
    },

    lastCompletedDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ['active', 'completed'],
      default: 'active',
    },

    rewardClaimed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'UserChallenge',
  userChallengeSchema
);