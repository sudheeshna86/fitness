const asyncHandler = require('express-async-handler');
const Analytics = require('../models/Analytics');
const { buildAnalytics } = require('../services/analyticsService');

const getAnalytics = asyncHandler(async (req, res) => {
  const analytics = await buildAnalytics();
  const stored = await Analytics.findOne();
  res.json({
    calories: analytics.calories,
    activeUsers: analytics.activeUsers,
    workoutsCompleted: analytics.workoutsCompleted,
    streakData: analytics.streakData,
    weeklyHydration: analytics.weeklyHydration || [],
    weeklySleep: analytics.weeklySleep || [],
    meta: {
      users: analytics.activeUsers,
      workoutsCompleted: analytics.workoutsCompleted,
      caloriesBurned: analytics.calories,
    },
    stored: stored || null,
  });
});

module.exports = { getAnalytics };
