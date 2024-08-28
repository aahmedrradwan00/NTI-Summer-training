import { Router } from 'express';
import { login, signup } from '../controllers/auth';
import { loginValidator, signupValidator } from '../utils/validation/authValidator';

const authRouter: Router = Router();

authRouter.route('/signup').post(signupValidator, signup);
authRouter.route('/login').post(loginValidator, login);

export default authRouter;
