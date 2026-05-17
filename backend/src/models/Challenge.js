const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    reward: { type: String, default: '' },
    status: { type: String, enum: ['Live', 'Draft', 'Ended'], default: 'Live' },
    completionPercentage: { type: Number, default: 0 },
    usersCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    endsInDays: { type: Number, default: 7 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Challenge', challengeSchema);
