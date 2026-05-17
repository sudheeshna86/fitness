const asyncHandler = require('express-async-handler');
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const { validateChallengePayload } = require('../validations/validators');

const getChallenges = asyncHandler(async (req, res) => {
  const challenges = await Challenge.find();
  res.json(challenges);
});

const createChallenge = asyncHandler(async (req, res) => {
  validateChallengePayload(req.body);
  const { title, description, reward, status, endsInDays } = req.body;
  const challenge = await Challenge.create({
    title,
    description,
    reward,
    status,
    endsInDays: endsInDays || 7,
    completionPercentage: 0,
    usersCompleted: [],
    participants: [],
  });
  res.status(201).json(challenge);
});

const updateChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge) {
    res.status(404);
    throw new Error('Challenge not found');
  }

  const { title, description, reward, status, endsInDays, completionPercentage } = req.body;
  if (title) challenge.title = title;
  if (description) challenge.description = description;
  if (reward) challenge.reward = reward;
  if (status) challenge.status = status;
  if (endsInDays !== undefined) challenge.endsInDays = endsInDays;
  if (completionPercentage !== undefined) challenge.completionPercentage = completionPercentage;

  const updatedChallenge = await challenge.save();
  res.json(updatedChallenge);
});

const deleteChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge) {
    res.status(404);
    throw new Error('Challenge not found');
  }
  await challenge.remove();
  res.json({ message: 'Challenge deleted successfully' });
});

const joinChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge) {
    res.status(404);
    throw new Error('Challenge not found');
  }

  if (!challenge.participants.includes(req.user._id)) {
    challenge.participants.push(req.user._id);
  }
  await challenge.save();

  res.json(challenge);
});

const completeChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge) {
    res.status(404);
    throw new Error('Challenge not found');
  }

  if (!challenge.usersCompleted.includes(req.user._id)) {
    challenge.usersCompleted.push(req.user._id);
    challenge.completionPercentage = Math.min(100, Math.round((challenge.usersCompleted.length / Math.max(challenge.participants.length, 1)) * 100));
    await challenge.save();
  }

  const user = await User.findById(req.user._id);
  if (user) {
    user.challengesCompleted += 1;
    await user.save();
  }

  res.json(challenge);
});

module.exports = { getChallenges, createChallenge, updateChallenge, deleteChallenge, joinChallenge, completeChallenge };
