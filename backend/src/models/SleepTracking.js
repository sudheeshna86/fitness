const mongoose = require('mongoose');

const sleepTrackingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sleepHours: { type: Number, required: true },
    sleepQuality: { type: String, enum: ['Poor', 'Average', 'Good', 'Excellent'], default: 'Average' },
    sleepDate: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SleepTracking', sleepTrackingSchema);
