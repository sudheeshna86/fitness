const mongoose = require('mongoose');

const streakSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    streakCount: { type: Number, required: true },
  },
  { _id: false }
);

const analyticsSchema = new mongoose.Schema(
  {
    calories: { type: Number, default: 0 },
    activeUsers: { type: Number, default: 0 },
    workoutsCompleted: { type: Number, default: 0 },
    streakData: { type: [streakSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Analytics', analyticsSchema);
