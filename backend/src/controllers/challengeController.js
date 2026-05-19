const asyncHandler = require('express-async-handler');

const Challenge = require('../models/Challenge');

const UserChallenge = require('../models/UserChallenge');

const User = require('../models/User');

const getChallenges = asyncHandler(async (req, res) => {
  const challenges = await Challenge.find().sort({
    createdAt: -1,
  });

  res.json({
    success: true,
    challenges,
  });
});

const createChallenge = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    reward,
    status,
    imageUrl,
    category,
    difficulty,
    duration,
    xpReward,
  } = req.body;

  const challenge = await Challenge.create({
    title,
    description,
    reward,
    status,
    imageUrl,
    category,
    difficulty,
    duration,
    targetDays: duration,
    xpReward,
  });

  res.status(201).json({
    success: true,
    challenge,
  });
});

const updateChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(
    req.params.id
  );

  if (!challenge) {
    res.status(404);
    throw new Error('Challenge not found');
  }

  Object.assign(challenge, req.body);

  const updatedChallenge = await challenge.save();

  res.json({
    success: true,
    challenge: updatedChallenge,
  });
});

const deleteChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(
    req.params.id
  );

  if (!challenge) {
    res.status(404);
    throw new Error('Challenge not found');
  }

  await challenge.deleteOne();

  res.json({
    success: true,
    message: 'Challenge deleted successfully',
  });
});

const joinChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(
    req.params.id
  );

  if (!challenge) {
    res.status(404);
    throw new Error('Challenge not found');
  }

  const existingChallenge =
    await UserChallenge.findOne({
      user: req.user._id,
      challenge: challenge._id,
    });

  if (existingChallenge) {
    res.status(400);
    throw new Error(
      'You already joined this challenge'
    );
  }

  const userChallenge =
    await UserChallenge.create({
      user: req.user._id,
      challenge: challenge._id,
    });

  challenge.participantsCount += 1;

  await challenge.save();

  res.status(201).json({
    success: true,
    userChallenge,
  });
});

const completeDailyChallenge =
  asyncHandler(async (req, res) => {
    const userChallenge =
      await UserChallenge.findById(
        req.params.id
      ).populate('challenge');

    if (!userChallenge) {
      res.status(404);

      throw new Error(
        'Challenge not found'
      );
    }

    // prevent completing already finished challenge
    if (
      userChallenge.status ===
      'completed'
    ) {
      res.status(400);

      throw new Error(
        'Challenge already completed'
      );
    }

    // REAL TODAY DATE
    const today =
      new Date()
        .toISOString()
        .split('T')[0];

    // LAST COMPLETED DATE
    const lastCompleted =
      userChallenge.lastCompletedDate
        ? new Date(
            userChallenge.lastCompletedDate
          )
            .toISOString()
            .split('T')[0]
        : null;

    // prevent multiple completion same day
    if (today === lastCompleted) {
      res.status(400);

      throw new Error(
        'You already completed today'
      );
    }

    // NEXT DAY
    const nextDay =
      userChallenge.currentDay + 1;

    // update challenge
    userChallenge.completedDays.push(
      nextDay
    );

    userChallenge.currentDay =
      nextDay;

    userChallenge.progress =
      Math.min(
        100,
        Math.round(
          (nextDay /
            userChallenge.challenge
              .targetDays) *
            100
        )
      );

    userChallenge.streak += 1;

    userChallenge.lastCompletedDate =
      new Date();

    // challenge completed
    if (
      nextDay >=
      userChallenge.challenge
        .targetDays
    ) {
      userChallenge.status =
        'completed';

      const user =
        await User.findById(
          req.user._id
        );

      if (user) {
        user.achievements.push(
          `${userChallenge.challenge.title} Completed`
        );

        user.challengesCompleted += 1;

        await user.save();
      }
    }

    await userChallenge.save();

    // return updated populated data
    const updatedChallenge =
      await UserChallenge.findById(
        userChallenge._id
      ).populate('challenge');

    res.json({
      success: true,
      userChallenge:
        updatedChallenge,
    });
  });

const getMyChallenges = asyncHandler(
  async (req, res) => {
    const challenges =
      await UserChallenge.find({
        user: req.user._id,
      }).populate('challenge');

    res.json({
      success: true,
      challenges,
    });
  }
);

module.exports = {
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  joinChallenge,
  completeDailyChallenge,
  getMyChallenges,
};