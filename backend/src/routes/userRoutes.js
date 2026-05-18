const express = require('express');

const {
  getAllUsers,
  getUserById,
  updateUser,
  getProfile,
  updateProfile,
} = require('../controllers/userController');

const {
  protect,
  admin,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, admin, getAllUsers);

router.get('/profile', protect, getProfile);

router.put('/profile', protect, updateProfile);

router.get('/:id', protect, getUserById);

router.put('/:id', protect, updateUser);

module.exports = router;