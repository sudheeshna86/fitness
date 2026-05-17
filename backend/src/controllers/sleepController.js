const asyncHandler = require('express-async-handler');
const SleepTracking = require('../models/SleepTracking');
const { validateSleepPayload } = require('../validations/validators');

const addSleep = asyncHandler(async (req, res) => {
  validateSleepPayload(req.body);
  const { userId, sleepHours, sleepQuality, sleepDate } = req.body;
  const entry = await SleepTracking.create({ userId, sleepHours, sleepQuality, sleepDate });
  res.status(201).json(entry);
});

const getSleepByUser = asyncHandler(async (req, res) => {
  const sleepEntries = await SleepTracking.find({ userId: req.params.userId }).sort({ sleepDate: -1 });
  res.json(sleepEntries);
});

const updateSleep = asyncHandler(async (req, res) => {
  const sleepEntry = await SleepTracking.findById(req.params.id);
  if (!sleepEntry) {
    res.status(404);
    throw new Error('Sleep entry not found');
  }

  const { sleepHours, sleepQuality, sleepDate } = req.body;
  if (sleepHours !== undefined) sleepEntry.sleepHours = sleepHours;
  if (sleepQuality) sleepEntry.sleepQuality = sleepQuality;
  if (sleepDate) sleepEntry.sleepDate = sleepDate;

  const updatedEntry = await sleepEntry.save();
  res.json(updatedEntry);
});

module.exports = { addSleep, getSleepByUser, updateSleep };
