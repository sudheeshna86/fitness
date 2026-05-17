const asyncHandler = require('express-async-handler');
const WaterTracking = require('../models/WaterTracking');
const { validateWaterPayload } = require('../validations/validators');

const addWater = asyncHandler(async (req, res) => {
  validateWaterPayload(req.body);
  const { userId, intakeAmount, goal, date } = req.body;
  const entry = await WaterTracking.create({ userId, intakeAmount, goal, date });
  res.status(201).json(entry);
});

const getWaterByUser = asyncHandler(async (req, res) => {
  const waterEntries = await WaterTracking.find({ userId: req.params.userId }).sort({ date: -1 });
  res.json(waterEntries);
});

const updateWater = asyncHandler(async (req, res) => {
  const waterEntry = await WaterTracking.findById(req.params.id);
  if (!waterEntry) {
    res.status(404);
    throw new Error('Water entry not found');
  }

  const { intakeAmount, goal, date } = req.body;
  if (intakeAmount !== undefined) waterEntry.intakeAmount = intakeAmount;
  if (goal !== undefined) waterEntry.goal = goal;
  if (date) waterEntry.date = date;

  const updatedEntry = await waterEntry.save();
  res.json(updatedEntry);
});

module.exports = { addWater, getWaterByUser, updateWater };
