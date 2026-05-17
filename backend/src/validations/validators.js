const validateRegister = ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error('Name, email and password are required');
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
};

const validateLogin = ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
};

const validateWorkoutPayload = ({ title, category, duration, caloriesBurn, difficulty }) => {
  if (!title || !category || !duration || !caloriesBurn || !difficulty) {
    throw new Error('Title, category, duration, calories, and difficulty are required');
  }
};

const validateChallengePayload = ({ title, description, reward, status }) => {
  if (!title || !description || !reward || !status) {
    throw new Error('Title, description, reward and status are required');
  }
};

const validateWaterPayload = ({ userId, intakeAmount, goal, date }) => {
  if (!userId || intakeAmount == null || !goal || !date) {
    throw new Error('User, intake amount, goal and date are required');
  }
};

const validateSleepPayload = ({ userId, sleepHours, sleepQuality, sleepDate }) => {
  if (!userId || sleepHours == null || !sleepQuality || !sleepDate) {
    throw new Error('User, sleep hours, quality and date are required');
  }
};

module.exports = {
  validateRegister,
  validateLogin,
  validateWorkoutPayload,
  validateChallengePayload,
  validateWaterPayload,
  validateSleepPayload,
};
