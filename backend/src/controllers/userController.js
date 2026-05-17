const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

const getProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
    res.status(403);
    throw new Error('Not authorized to update this user');
  }

  const { name, age, gender, height, weight, fitnessGoals, profileImage } = req.body;

  if (name) user.name = name;
  if (age !== undefined) user.age = age;
  if (gender) user.gender = gender;
  if (height !== undefined) user.height = height;
  if (weight !== undefined) user.weight = weight;
  if (fitnessGoals) user.fitnessGoals = fitnessGoals;
  if (profileImage) user.profileImage = profileImage;

  if (user.height && user.weight) {
    user.bmi = Number((user.weight / ((user.height / 100) * (user.height / 100))).toFixed(1));
  }

  const updatedUser = await user.save();
  res.json({
    id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    age: updatedUser.age,
    gender: updatedUser.gender,
    height: updatedUser.height,
    weight: updatedUser.weight,
    bmi: updatedUser.bmi,
    streak: updatedUser.streak,
    role: updatedUser.role,
    achievements: updatedUser.achievements,
    fitnessGoals: updatedUser.fitnessGoals,
    profileImage: updatedUser.profileImage,
  });
});

module.exports = { getAllUsers, getUserById, getProfile, updateUser };
