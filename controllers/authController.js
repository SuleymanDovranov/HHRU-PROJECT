const AppError = require('./../utils/appError');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { Users } = require('./../models');
const catchAsync = require('./../utils/catchAsync');

const signToken = (id) => {
  return jwt.sign({ id }, 'hhru', {
    expiresIn: '24h',
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.uuid);
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });
  res.status(statusCode).json({ token });
};

exports.login = catchAsync(async (req, res, next) => {
  const { firstName } = req.body;
  if (!firstName)
    return next(new AppError('Please enter your firstName!', 400));
  const user = await Users.findOne({ where: { firstName: firstName } });

  if (!user) return next(new AppError('Wrong firstName', 400));
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return next(new AppError('You are not logged!', 400));
  const decoded = await promisify(jwt.verify)(token, 'hhru');

  const freshUser = await Users.findOne({ where: { uuid: decoded.id } });
  if (!freshUser)
    return next(
      new AppError('The User belonging to this token is no longer exists', 400)
    );

  req.user = freshUser;
  next();
});
