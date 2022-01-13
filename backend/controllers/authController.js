const jwt = require('jsonwebtoken');

const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Default for localhost
  let cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: false,
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.sameSite = 'none';
    cookieOptions.secure = true;
  }
  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    token,
    user,
  });
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//@desc         Register
//@route        POST /api/auth/register
//@access       Public
exports.register = catchAsync(async (req, res, next) => {
  const { email, password, confirmPassword, name } = req.body;

  if (password !== confirmPassword) {
    return next(
      new AppError("Password and confirm password doesn't match!", 400),
    );
  }

  const user = await User.create({name, email, password });

  createSendToken(user, 200, res);
});

//@desc         Login
//@route        POST /api/auth/login
//@access       Public
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }

  createSendToken(user, 200, res);
});

//@desc         Check user is logged in
//@route        GET /api/auth
//@access       PRIVATE
exports.authenticate = (req, res) => {
  res.status(200).json({ user: req.user });
};

//@desc         Log out user
//@route        GET /api/auth/logout
//@access       PRIVATE
exports.logout = (req, res) => {
  // Default for localhost
  let cookieOptions = {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
    secure: false,
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.sameSite = 'none';
    cookieOptions.secure = true;
  }
  res.cookie('jwt', 'over', cookieOptions);

  res.status(204).json({ success: true, data: {} });
};
