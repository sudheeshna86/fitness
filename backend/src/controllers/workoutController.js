const asyncHandler = require('express-async-handler');
const Workout = require('../models/Workout');
const User = require('../models/User');
const { validateWorkoutPayload } = require('../validations/validators');

const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find().populate('createdBy', 'name email');
  res.json(workouts);
});

const createWorkout = asyncHandler(async (req, res) => {
  console.log('createWorkout - req.user:', req.user ? { id: req.user._id, role: req.user.role } : null);
  if (!req.user) {
    res.status(401);
    throw new Error('Authentication required to create a workout');
  }
  validateWorkoutPayload(req.body);
  const { title, description, category, duration, caloriesBurn, difficulty, exercises, thumbnail, status } = req.body;
  const workout = await Workout.create({
    title,
    description,
    category,
    duration,
    caloriesBurn,
    difficulty,
    exercises: exercises || [],
    thumbnail: thumbnail || '',
    createdBy: req.user._id,
    status: status || 'published',
  });

  res.status(201).json(workout);
});

const updateWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) {
    res.status(404);
    throw new Error('Workout not found');
  }

  if (req.user.role !== 'admin' && workout.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this workout');
  }

  const { title, description, category, duration, caloriesBurn, difficulty, exercises, thumbnail, status } = req.body;
  if (title) workout.title = title;
  if (description) workout.description = description;
  if (category) workout.category = category;
  if (duration !== undefined) workout.duration = duration;
  if (caloriesBurn !== undefined) workout.caloriesBurn = caloriesBurn;
  if (difficulty) workout.difficulty = difficulty;
  if (exercises) workout.exercises = exercises;
  if (thumbnail) workout.thumbnail = thumbnail;
  if (status) workout.status = status;

  const updatedWorkout = await workout.save();
  res.json(updatedWorkout);
});

const deleteWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) {
    res.status(404);
    throw new Error('Workout not found');
  }

  if (req.user.role !== 'admin' && workout.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this workout');
  }

  await workout.remove();
  res.json({ message: 'Workout deleted successfully' });
});

const getWorkoutById = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id).populate('createdBy', 'name email');
  if (!workout) {
    res.status(404);
    throw new Error('Workout not found');
  }
  res.json(workout);
});

const completeWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) {
    res.status(404);
    throw new Error('Workout not found');
  }

  if (!workout.completedBy.includes(req.user._id)) {
    workout.completedBy.push(req.user._id);
    await workout.save();
  }

  const user = await User.findById(req.user._id);
  if (user) {
    user.workoutsCompleted += 1;
    await user.save();
  }

  res.json({ message: 'Workout marked as completed', completedBy: workout.completedBy.length });
});

module.exports = { getWorkouts, getWorkoutById, createWorkout, updateWorkout, deleteWorkout, completeWorkout };
