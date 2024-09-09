import { Router } from 'express';
import { forgetPassword, login, resetCode, signup, verifyResetCode } from '../controllers/authController';
import { loginValidator, resetCodeValidator, sendMailValidator, signupValidator } from '../utils/validation/authValidator';

const authRouter: Router = Router();

// signup
authRouter.route('/signup').post(signupValidator, signup);
// login
authRouter.route('/login').post(loginValidator, login);
// forget Password
authRouter.route('/forgetPassword').post(sendMailValidator,forgetPassword);
// verifyCode password code
authRouter.route('/verifyCode').post(verifyResetCode);
// reset password code
authRouter.route('/resetCode').put(resetCodeValidator, resetCode);
export default authRouter;
