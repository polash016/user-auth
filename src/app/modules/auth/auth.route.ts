import express from 'express';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/register', AuthController.registerUserIntoDB);

router.post('/login', AuthController.loginUser);

router.post('/logOut', auth, AuthController.logOut);

export const AuthRoutes = router;
