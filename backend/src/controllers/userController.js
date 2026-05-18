const asyncHandler = require('express-async-handler');

const User = require('../models/User');

const normalizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  age: user.age,
  gender: user.gender,
  height: user.height,
  weight: user.weight,
  bmi: user.bmi,
  streak: user.streak,
  role: user.role,
  achievements: user.achievements,
  fitnessGoals: user.fitnessGoals,
  profileImage: user.profileImage,
  workoutsCompleted: user.workoutsCompleted,
  challengesCompleted: user.challengesCompleted,
  createdAt: user.createdAt,
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');

  res.json({
    success: true,
    users: users.map(normalizeUser),
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    success: true,
    user: normalizeUser(user),
  });
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    success: true,
    user: normalizeUser(user),
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const {
    name,
    age,
    gender,
    height,
    weight,
    fitnessGoals,
    profileImage,
  } = req.body;

  // VALIDATIONS

  if (name !== undefined && name.trim().length < 2) {
    res.status(400);
    throw new Error('Name must contain at least 2 characters');
  }

  if (age !== undefined && (age < 1 || age > 120)) {
    res.status(400);
    throw new Error('Invalid age');
  }

  if (height !== undefined && (height < 50 || height > 300)) {
    res.status(400);
    throw new Error('Invalid height');
  }

  if (weight !== undefined && (weight < 10 || weight > 500)) {
    res.status(400);
    throw new Error('Invalid weight');
  }

  // UPDATE FIELDS

  if (name !== undefined) user.name = name;
  if (age !== undefined) user.age = age;
  if (gender !== undefined) user.gender = gender;
  if (height !== undefined) user.height = height;
  if (weight !== undefined) user.weight = weight;
  if (fitnessGoals !== undefined)
    user.fitnessGoals = fitnessGoals;
  if (profileImage !== undefined)
    user.profileImage = profileImage;

  // BMI CALCULATION

  if (user.height && user.weight) {
    user.bmi = Number(
      (
        user.weight /
        ((user.height / 100) * (user.height / 100))
      ).toFixed(1)
    );
  }

  const updatedUser = await user.save();

  res.json({
    success: true,
    message: 'Profile updated successfully',
    user: normalizeUser(updatedUser),
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  Object.assign(user, req.body);

  const updatedUser = await user.save();

  res.json({
    success: true,
    message: 'User updated successfully',
    user: normalizeUser(updatedUser),
  });
});

module.exports = {
  getAllUsers,
  getUserById,
  getProfile,
  updateProfile,
  updateUser,
};