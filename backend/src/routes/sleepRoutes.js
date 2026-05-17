const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addSleep, getSleepByUser, updateSleep } = require('../controllers/sleepController');
const router = express.Router();

router.post('/', protect, addSleep);
router.get('/:userId', protect, getSleepByUser);
router.put('/:id', protect, updateSleep);

module.exports = router;
