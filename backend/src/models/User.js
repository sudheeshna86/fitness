const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, default: 0 },
    gender: { type: String, default: 'other' },
    height: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    bmi: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    achievements: { type: [String], default: [] },
    fitnessGoals: { type: [String], default: [] },
    profileImage: { type: String, default: '' },
    workoutsCompleted: { type: Number, default: 0 },
    challengesCompleted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
