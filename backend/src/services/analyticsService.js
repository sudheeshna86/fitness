const Analytics = require('../models/Analytics');
const Workout = require('../models/Workout');
const User = require('../models/User');
const WaterTracking = require('../models/WaterTracking');
const SleepTracking = require('../models/SleepTracking');

const buildAnalytics = async () => {
  const defaultStats = await Analytics.findOne();
  const totalCalories = defaultStats?.calories ?? 0;
  const activeUsers = await User.countDocuments({});
  const workoutsCompleted = await Workout.countDocuments({ completedBy: { $exists: true, $ne: [] } });

  const streakData = defaultStats?.streakData ?? [];
  const weeklyHydration = await WaterTracking.aggregate([
    { $group: { _id: '$date', totalIntake: { $sum: '$intakeAmount' } } },
    { $sort: { _id: 1 } },
  ]);
  const weeklySleep = await SleepTracking.aggregate([
    { $group: { _id: '$sleepDate', averageHours: { $avg: '$sleepHours' } } },
    { $sort: { _id: 1 } },
  ]);

  return {
    calories: totalCalories,
    activeUsers,
    workoutsCompleted,
    streakData,
    weeklyHydration,
    weeklySleep,
  };
};

module.exports = { buildAnalytics };
