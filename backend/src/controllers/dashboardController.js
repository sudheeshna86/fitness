const asyncHandler = require(
  'express-async-handler'
);

const User = require(
  '../models/User'
);

const Workout = require(
  '../models/Workout'
);

const WorkoutHistory = require(
  '../models/WorkoutHistory'
);

const UserChallenge = require(
  '../models/UserChallenge'
);

const WaterTracking = require(
  '../models/WaterTracking'
);

const SleepTracking = require(
  '../models/SleepTracking'
);

const getDashboardData =
  asyncHandler(async (req, res) => {
    const user =
      await User.findById(
        req.user._id
      );

    const activeChallenge =
      await UserChallenge.findOne({
        user: req.user._id,
        status: 'active',
      }).populate('challenge');

    const featuredWorkout =
      await Workout.findOne({
        featured: true,
      }).populate('exercises');

    const recentWorkouts =
      await WorkoutHistory.find({
        user: req.user._id,
      })
        .populate('workout')
        .sort({
          createdAt: -1,
        })
        .limit(5);

    const today =
      new Date()
        .toISOString()
        .split('T')[0];

    const hydration =
      await WaterTracking.findOne({
        userId: req.user._id,
        date: today,
      });

    const sleep =
      await SleepTracking.findOne({
        userId: req.user._id,
        sleepDate: today,
      });

    const totalCalories =
      recentWorkouts.reduce(
        (acc, item) =>
          acc + item.caloriesBurned,
        0
      );

    const weeklyProgress =
      recentWorkouts.map((item) => ({
        day:
          item.createdAt.toLocaleDateString(
            'en-US',
            {
              weekday: 'short',
            }
          ),

        calories:
          item.caloriesBurned,
      }));

    let motivationalMessage =
      'Consistency creates champions 💪';

    if (user.streak >= 7) {
      motivationalMessage =
        '7 Day Streak! Beast mode activated 🔥';
    }

    if (user.workoutsCompleted >= 20) {
      motivationalMessage =
        'You are becoming unstoppable 🚀';
    }

    res.json({
      success: true,

      dashboard: {
        user: {
          name: user.name,
          streak: user.streak,
          workoutsCompleted:
            user.workoutsCompleted,
          challengesCompleted:
            user.challengesCompleted,
          profileImage:
            user.profileImage,
          achievements:
            user.achievements,
        },

        stats: {
          caloriesBurned:
            totalCalories,

          workoutsCompleted:
            user.workoutsCompleted,

          challengesCompleted:
            user.challengesCompleted,

          streak: user.streak,
        },

        hydration: hydration || null,

        sleep: sleep || null,

        activeChallenge:
          activeChallenge || null,

        featuredWorkout:
          featuredWorkout || null,

        recentWorkouts,

        weeklyProgress,

        motivationalMessage,
      },
    });
  });

module.exports = {
  getDashboardData,
};