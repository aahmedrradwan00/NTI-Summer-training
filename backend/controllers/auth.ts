import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import { User } from '../interfaces/user';
import userModel from '../models/userModel';
import bcrypt from 'bcryptjs';
import ApiErrors from '../utils/apiErrors';

const createToken = (id: any) => {
    return Jwt.sign({ _id: id }, process.env.JWT_SECRET_KEY!, { expiresIn: process.env.JWT_EXPIRES_IN });
};

export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user: User = await userModel.create(req.body);
    const token = createToken(user._id);
    res.status(201).json({ token, data: user });
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new ApiErrors('uncorrect email or passwor', 401));
    }
    const token = createToken(user._id);
    res.status(201).json({ token, data: user });
});

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

export const allowedTo = (...roles: string[]) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // roles ['admin', 'lead-guide']. role='user'
        if (!roles.includes(req.user?.role ?? '')) {
            return next(new ApiErrors('You do not have permission to perform this action', 400));
        }
        next();
    });

export const checkActive = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.active) return next(new ApiErrors('your account is not active', 403));
    next();
});
