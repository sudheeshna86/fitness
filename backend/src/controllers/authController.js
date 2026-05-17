const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { validateRegister, validateLogin } = require('../validations/validators');

const registerUser = asyncHandler(async (req, res) => {
  validateRegister(req.body);

  const { name, email, password, age, gender, height, weight, profileImage, fitnessGoals } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const bmi = weight && height ? Number((weight / ((height / 100) * (height / 100))).toFixed(1)) : 0;

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    age: age || 0,
    gender: gender || 'other',
    height: height || 0,
    weight: weight || 0,
    bmi,
    profileImage: profileImage || '',
    fitnessGoals: fitnessGoals || [],
    achievements: [],
  });

  res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      bmi: user.bmi,
      streak: user.streak,
      role: user.role,
      achievements: user.achievements,
      fitnessGoals: user.fitnessGoals,
      profileImage: user.profileImage,
    },
    token: generateToken(user._id),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  validateLogin(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      bmi: user.bmi,
      streak: user.streak,
      role: user.role,
      achievements: user.achievements,
      fitnessGoals: user.fitnessGoals,
      profileImage: user.profileImage,
    },
    token: generateToken(user._id),
  });
});

module.exports = { registerUser, loginUser };
