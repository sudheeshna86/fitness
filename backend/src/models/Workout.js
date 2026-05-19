const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: '',
    },

    category: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    caloriesBurn: {
      type: Number,
      required: true,
    },

    difficulty: {
      type: String,
      enum: [
        'Beginner',
        'Intermediate',
        'Advanced',
      ],
      default: 'Intermediate',
    },

    thumbnail: {
      type: String,
      default: '',
    },

    equipment: {
      type: [String],
      default: [],
    },

    benefits: {
      type: [String],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    exercises: [
      {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
      },
    ],

    createdBy: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'published',
    },

    completedBy: [
      {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'Workout',
  workoutSchema
);