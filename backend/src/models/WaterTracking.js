const mongoose = require('mongoose');

const waterTrackingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    intakeAmount: { type: Number, required: true },
    goal: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WaterTracking', waterTrackingSchema);
