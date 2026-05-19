const mongoose = require('mongoose');

const workoutHistorySchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },

      workout: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        required: true,
      },

      caloriesBurned: {
        type: Number,
        default: 0,
      },

      duration: {
        type: Number,
        default: 0,
      },

      completedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  'WorkoutHistory',
  workoutHistorySchema
);