const express = require('express');

const {
  protect,
  admin,
} = require('../middleware/authMiddleware');

const {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  completeWorkout,
} = require('../controllers/workoutController');

const router = express.Router();

router.get('/', getWorkouts);

router.get('/:id', getWorkoutById);

router.post(
  '/',
  protect,

  createWorkout
);

router.put(
  '/:id',
  protect,
 
  updateWorkout
);

router.delete(
  '/:id',
  protect,

  deleteWorkout
);

router.post(
  '/:id/complete',
  protect,
  completeWorkout
);

module.exports = router;