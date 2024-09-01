import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import { User } from '../interfaces/user';
import userModel from '../models/userModel';
import bcrypt from 'bcryptjs';
import ApiErrors from '../utils/apiErrors';
import crypto from 'crypto';
import sendEmail from '../utils/email';

const createToken = (id: any) => {
    return Jwt.sign({ _id: id }, process.env.JWT_SECRET_KEY!, { expiresIn: process.env.JWT_EXPIRES_IN });
};

// signup
export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user: User = await userModel.create(req.body);
    const token = createToken(user._id);
    res.status(201).json({ token, data: user });
});

// login
export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new ApiErrors('uncorrect email or passwor', 401));
    }
    const token = createToken(user._id);
    res.status(201).json({ token, data: user });
});

// protect Routes
export const protectRoutes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //check token
    let token: string = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else next(new ApiErrors('Please Login in to App', 400));
    const decode: any = Jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const currentUser = await userModel.findById(decode._id);
    if (!currentUser) return next(new ApiErrors('The user belonging to this token does no longer exist.', 401));
    if (currentUser.passwordChangedAt instanceof Date) {
        const changedPasswordTime: number = currentUser.passwordChangedAt.getTime() / 1000;
        if (changedPasswordTime > decode.iat) return next(new ApiErrors('login again', 401));
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});

// forget Password
export const forgetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return next(new ApiErrors('user not found', 404));
    const resetCode: string = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = crypto.createHash('sha256').update(resetCode).digest('hex');
    user.resetCodeExpireTime = Date.now() + 10 * 60 * 1000;
    user.resetCodeVerify = false;
    const message: string = `Use this code to reset your password: ${resetCode}`;
    try {
        await sendEmail({ email: user.email, subject: 'Reset Password', message });
        await user.save({ validateModifiedOnly: true });
    } catch (error) {
        return next(new ApiErrors('Error sending email', 400));
    }
    const resetToken: string = createToken(user._id);
    res.status(200).json({ message: 'Reset code sent to email', resetToken });
});

// verify Reset Code
export const verifyResetCode = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let resetToken: string = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        resetToken = req.headers.authorization.split(' ')[1];
    } else {
        return next(new ApiErrors('get your reset code first', 400));
    }
    const decodedToken: any = Jwt.verify(resetToken, process.env.JWT_SECRET_KEY!);
    const hashedResetCode: string = crypto.createHash('sha256').update(req.body.resetCode).digest('hex');
    const user = await userModel.findOne({
        _id: decodedToken._id,
        resetCode: hashedResetCode,
        resetCodeExpireTime: { $gt: Date.now() },
    });
    if (!user) return next(new ApiErrors('invalid or expired reset code', 400));
    user.resetCodeVerify = true;
    await user.save({ validateModifiedOnly: true });
    res.status(200).json({ message: 'reset code verified' });
});

// reset Code
export const resetCode = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let resetToken: string = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        resetToken = req.headers.authorization.split(' ')[1];
    } else return next(new ApiErrors("You don't have permission to perform this action.", 400));
    const decodedToken: any = Jwt.verify(resetToken, process.env.JWT_SECRET_KEY!);
    const user = await userModel.findOne({
        _id: decodedToken._id,
        resetCodeVerify: true,
    });
    if (!user) return next(new ApiErrors('verify your reset code first', 400));
    user.password = req.body.password;
    user.resetCode = undefined;
    user.resetCodeExpireTime = undefined;
    user.resetCodeVerify = undefined;
    user.passwordChangedAt = Date.now();
    await user.save({ validateModifiedOnly: true });
    res.status(200).json({ message: 'your password has been changed' });
});

// allowed To
export const allowedTo = (...roles: string[]) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // roles ['admin', 'lead-guide']. role='user'
        if (!roles.includes(req.user?.role ?? '')) {
            return next(new ApiErrors('You do not have permission to perform this action', 400));
        }
        next();
    });

// checkActive
export const checkActive = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.active) return next(new ApiErrors('your account is not active', 403));
    next();
});
