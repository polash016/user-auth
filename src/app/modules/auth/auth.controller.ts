import catchAsync from '../../utils/catchAsync';
import { User } from '../user/user.schemaModel';

const registerUserIntoDB = catchAsync(async (req, res) => {
  const result = await User.create(req.body);

  res.status(200).json({
    success: true,
    message: 'Registration Completed successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select('+password');

  if (!user) {
    throw new Error('User Not Found');
  }

  if (!(await User.isPasswordMatched(password, user?.password))) {
    throw new Error('Wrong Password');
  }

  req.session.userId = user._id.toString();

  res.cookie('sessionId', req.sessionID, { secure: true, httpOnly: true });

  res.status(200).json({
    success: true,
    message: 'Logged In successfully.',
    data: user,
  });
});

const logOut = catchAsync(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw new Error(err);
    } else {
      res.clearCookie('sessionId');
    }
  });

  res.clearCookie('sessionId');

  res.status(200).json({
    success: true,
    message: 'Logged Out successfully.',
  });
});

export const AuthController = {
  registerUserIntoDB,
  loginUser,
  logOut,
};
