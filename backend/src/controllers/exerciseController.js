const asyncHandler = require(
  'express-async-handler'
);

const Exercise = require(
  '../models/Exercise'
);

const getExercises =
  asyncHandler(async (req, res) => {
    const exercises =
      await Exercise.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      exercises,
    });
  });

const getExerciseById =
  asyncHandler(async (req, res) => {
    const exercise =
      await Exercise.findById(
        req.params.id
      );

    if (!exercise) {
      res.status(404);

      throw new Error(
        'Exercise not found'
      );
    }

    res.json({
      success: true,
      exercise,
    });
  });

const createExercise =
  asyncHandler(async (req, res) => {
    const {
      name,
      description,
      instructions,
      targetMuscle,
      duration,
      restTime,
      caloriesBurn,
      difficulty,
      imageUrl,
      equipment,
      tips,
    } = req.body;

    const exercise =
      await Exercise.create({
        name,
        description,
        instructions,
        targetMuscle,
        duration,
        restTime,
        caloriesBurn,
        difficulty,
        imageUrl,
        equipment,
        tips,
        createdBy: req.user._id,
      });

    res.status(201).json({
      success: true,
      exercise,
    });
  });

const updateExercise =
  asyncHandler(async (req, res) => {
    const exercise =
      await Exercise.findById(
        req.params.id
      );

    if (!exercise) {
      res.status(404);

      throw new Error(
        'Exercise not found'
      );
    }

    Object.assign(exercise, req.body);

    const updatedExercise =
      await exercise.save();

    res.json({
      success: true,
      exercise: updatedExercise,
    });
  });

const deleteExercise =
  asyncHandler(async (req, res) => {
    const exercise =
      await Exercise.findById(
        req.params.id
      );

    if (!exercise) {
      res.status(404);

      throw new Error(
        'Exercise not found'
      );
    }

    await exercise.deleteOne();

    res.json({
      success: true,
      message:
        'Exercise deleted successfully',
    });
  });

module.exports = {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
};