const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  completeWorkout,
} = require('../controllers/workoutController');

const router = express.Router();

router.get('/', protect, getWorkouts);
router.get('/:id', protect, getWorkoutById);
router.post('/', protect, createWorkout);
router.put('/:id', protect, admin, updateWorkout);
router.delete('/:id', protect, admin, deleteWorkout);
router.post('/:id/complete', protect, completeWorkout);

module.exports = router;
