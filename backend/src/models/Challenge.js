const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      default: '',
    },

    category: {
      type: String,
      enum: [
        'Workout',
        'Water',
        'Sleep',
        'Weight Loss',
        'Strength',
      ],
      default: 'Workout',
    },

    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Easy',
    },

    reward: {
      type: String,
      default: '',
    },

    duration: {
      type: Number,
      default: 30,
    },

    targetDays: {
      type: Number,
      default: 30,
    },

    xpReward: {
      type: Number,
      default: 100,
    },

    status: {
      type: String,
      enum: ['Live', 'Draft', 'Completed'],
      default: 'Live',
    },

    participantsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'Challenge',
  challengeSchema
);