const express = require('express');

const {
  protect,
  admin,
} = require('../middleware/authMiddleware');

const {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
} = require('../controllers/exerciseController');

const router = express.Router();

router.get('/', getExercises);

router.get('/:id', getExerciseById);

router.post(
  '/',
  protect,
  
  createExercise
);

router.put(
  '/:id',
  protect,
 
  updateExercise
);

router.delete(
  '/:id',
  protect,

  deleteExercise
);

module.exports = router;