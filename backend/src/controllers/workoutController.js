const asyncHandler = require(
  'express-async-handler'
);

const Workout = require(
  '../models/Workout'
);

const User = require(
  '../models/User'
);
const WorkoutHistory = require(
  '../models/WorkoutHistory'
);
const getWorkouts =
  asyncHandler(async (req, res) => {
    const workouts =
      await Workout.find()
        .populate(
          'createdBy',
          'name email'
        )
        .populate('exercises')
        .sort({
          createdAt: -1,
        });

    res.json({
      success: true,
      workouts,
    });
  });

const getWorkoutById =
  asyncHandler(async (req, res) => {
    const workout =
      await Workout.findById(
        req.params.id
      )
        .populate(
          'createdBy',
          'name email'
        )
        .populate('exercises');

    if (!workout) {
      res.status(404);

      throw new Error(
        'Workout not found'
      );
    }

    res.json({
      success: true,
      workout,
    });
  });

const createWorkout =
  asyncHandler(async (req, res) => {
    const {
      title,
      description,
      category,
      duration,
      caloriesBurn,
      difficulty,
      thumbnail,
      equipment,
      benefits,
      tags,
      featured,
      exercises,
      status,
    } = req.body;

    const workout =
      await Workout.create({
        title,
        description,
        category,
        duration,
        caloriesBurn,
        difficulty,
        thumbnail,
        equipment,
        benefits,
        tags,
        featured,
        exercises,
        createdBy: req.user._id,
        status,
      });

    const populatedWorkout =
      await Workout.findById(
        workout._id
      ).populate('exercises');

    res.status(201).json({
      success: true,
      workout: populatedWorkout,
    });
  });

const updateWorkout =
  asyncHandler(async (req, res) => {
    const workout =
      await Workout.findById(
        req.params.id
      );

    if (!workout) {
      res.status(404);

      throw new Error(
        'Workout not found'
      );
    }

    Object.assign(workout, req.body);

    const updatedWorkout =
      await workout.save();

    res.json({
      success: true,
      workout: updatedWorkout,
    });
  });

const deleteWorkout =
  asyncHandler(async (req, res) => {
    const workout =
      await Workout.findById(
        req.params.id
      );

    if (!workout) {
      res.status(404);

      throw new Error(
        'Workout not found'
      );
    }

    await workout.deleteOne();

    res.json({
      success: true,
      message:
        'Workout deleted successfully',
    });
  });

const completeWorkout =
  asyncHandler(async (req, res) => {
    const workout =
      await Workout.findById(
        req.params.id
      );

    if (!workout) {
      res.status(404);

      throw new Error(
        'Workout not found'
      );
    }

    if (
      !workout.completedBy.includes(
        req.user._id
      )
    ) {
      workout.completedBy.push(
        req.user._id
      );

      await workout.save();
    }

    const user =
      await User.findById(
        req.user._id
      );

    if (user) {
      user.workoutsCompleted += 1;

      if (
        user.workoutsCompleted % 5 ===
        0
      ) {
        user.streak += 1;
      }

      await user.save();
    }

    await WorkoutHistory.create({
      user: req.user._id,

      workout: workout._id,

      caloriesBurned:
        workout.caloriesBurn,

      duration:
        workout.duration,
    });

    res.json({
      success: true,
      message:
        'Workout completed successfully',
    });
  });

module.exports = {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  completeWorkout,
};