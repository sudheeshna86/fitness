const express = require('express');

const {
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  joinChallenge,
  completeDailyChallenge,
  getMyChallenges,
} = require('../controllers/challengeController');

const {
  protect,
  admin,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getChallenges);

router.get(
  '/my-challenges',
  protect,
  getMyChallenges
);

router.post(
  '/',
  protect,
  
  createChallenge
);

router.put(
  '/:id',
  protect,
  
  updateChallenge
);

router.delete(
  '/:id',
  protect,
  admin,
  deleteChallenge
);

router.post(
  '/:id/join',
  protect,
  joinChallenge
);

router.post(
  '/progress/:id',
  protect,
  completeDailyChallenge
);

module.exports = router;