const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('protect middleware - Authorization header:', authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('Not authorized, token missing');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('protect middleware - decoded token id:', decoded?.id);
    req.user = await User.findById(decoded.id).select('-password');
    console.log('protect middleware - resolved user:', req.user ? { id: req.user._id, role: req.user.role } : null);
    if (!req.user) {
      res.status(401);
      throw new Error('Unauthorized user');
    }
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Admin privileges required');
  }
};

module.exports = { protect, admin };
