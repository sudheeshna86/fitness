const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addWater, getWaterByUser, updateWater } = require('../controllers/waterController');
const router = express.Router();

router.post('/', protect, addWater);
router.get('/:userId', protect, getWaterByUser);
router.put('/:id', protect, updateWater);

module.exports = router;
