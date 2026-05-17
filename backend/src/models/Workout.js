const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sets: { type: Number, default: 3 },
    reps: { type: Number, default: 10 },
    image: { type: String, default: '' },
  },
  { _id: true }
);

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    category: { type: String, required: true },
    duration: { type: Number, required: true },
    caloriesBurn: { type: Number, required: true },
    difficulty: { type: String, enum: ['Basic', 'Pro', 'Elite'], default: 'Pro' },
    exercises: { type: [exerciseSchema], default: [] },
    thumbnail: { type: String, default: '' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['published', 'draft'], default: 'published' },
    completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workout', workoutSchema);
