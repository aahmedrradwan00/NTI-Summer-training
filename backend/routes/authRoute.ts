import { Router } from 'express';
import { forgetPassword, login, resetCode, signup, verifyResetCode } from '../controllers/auth';
import { loginValidator, resetCodeValidator, signupValidator } from '../utils/validation/authValidator';
import sendEmail from '../utils/email';

const authRouter: Router = Router();

authRouter.route('/signup').post(signupValidator, signup);
authRouter.route('/login').post(loginValidator, login);
authRouter.route('/forgetPassword').post(sendEmail, forgetPassword);
authRouter.route('/verifyCode').post(verifyResetCode);
authRouter.route('/resetCode').put(resetCodeValidator, resetCode);
export default authRouter;
