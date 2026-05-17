const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  joinChallenge,
  completeChallenge,
} = require('../controllers/challengeController');

const router = express.Router();

router.get('/', protect, getChallenges);
router.post('/', protect, admin, createChallenge);
router.put('/:id', protect, admin, updateChallenge);
router.delete('/:id', protect, admin, deleteChallenge);
router.post('/:id/join', protect, joinChallenge);
router.post('/:id/complete', protect, completeChallenge);

module.exports = router;
