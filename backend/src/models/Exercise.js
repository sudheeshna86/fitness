const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: '',
    },

    instructions: {
      type: [String],
      default: [],
    },

    targetMuscle: {
      type: String,
      default: '',
    },

    duration: {
      type: Number,
      default: 30,
    },

    restTime: {
      type: Number,
      default: 10,
    },

    caloriesBurn: {
      type: Number,
      default: 10,
    },

    difficulty: {
      type: String,
      enum: [
        'Beginner',
        'Intermediate',
        'Advanced',
      ],
      default: 'Beginner',
    },

    imageUrl: {
      type: String,
      default: '',
    },

    equipment: {
      type: [String],
      default: [],
    },

    tips: {
      type: [String],
      default: [],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'Exercise',
  exerciseSchema
);