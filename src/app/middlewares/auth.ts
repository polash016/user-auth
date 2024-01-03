import catchAsync from '../utils/catchAsync';

const auth = catchAsync((req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  }
  res.status(401).json({ message: 'Unauthorized User' });
});

export default auth;
