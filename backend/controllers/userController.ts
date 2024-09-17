import asyncHandler from 'express-async-handler';
import { User } from '../interfaces/user';
import userModel from '../models/userModel';
import { createOne, deleteOne, getAll, getOne, updateOne } from './refactorHandler';
import { Request, Response, NextFunction } from 'express';
import ApiErrors from '../utils/apiErrors';
import { uploadSingleImages } from '../middlewares/uploadsImages';
import sharp from 'sharp';
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';

const createToken = (payload: any, role: string) => Jwt.sign({ _id: payload, role: role }, process.env.JWT_SECRET_KEY!, { expiresIn: process.env.JWT_EXPIRES_IN });

//create User
export const createUser = createOne<User>(userModel);

//get all User
export const getUsers = getAll<User>(userModel, 'User');

//get one User
export const getUser = getOne<User>(userModel);

//update one User
export const updateUser = asyncHandler(async (req: Request, res: any, next: any) => {
    const { name, image, active } = req.body;
    const user = await userModel.findByIdAndUpdate(
        req.params.id,
        {
            name,
            image,
            active,
        },
        { new: true }
    );
    if (!user) return next(new ApiErrors('user not found', 404));
    res.status(200).json({ data: user, message: 'user updated successfully' });
});

// delete User
export const deleteUser = deleteOne<User>(userModel);

export const uploadUserImage = uploadSingleImages('image');

export const resizeUserImage = asyncHandler(async (req, res, next) => {
    if (req.file) {
        const imageName: string = `user-${Date.now()}.jpeg`;
        await sharp(req.file.buffer).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`uploads/users/${imageName}`);
        req.body.image = imageName;
    }
    next();
});

export const changeUserPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { password } = req.body;
    const user = await userModel.findByIdAndUpdate(id, { password: await bcrypt.hash(password, 12), passwordChangedAt: Date.now() }, { new: true });
    if (!user) return next(new ApiErrors('user not found', 404));
    res.status(200).json({ message: 'password changed successfully', data: user });
});
export const setLoggedUserId = asyncHandler((req: Request, res: Response, next: NextFunction) => {
    req.params.id = req.user?._id!.toString();
    next();
});

export const updateLoggedUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userModel.findByIdAndUpdate(req.user?._id, { name: req.body.name, image: req.body.image }, { new: true });
    if (!user) return next(new ApiErrors('user not found', 404));
    res.status(200).json({ data: user, message: 'user updated successfully' });
});

export const getLoggedUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    req.params.id = req.user?._id!.toString();
    next();
});

export const changeLoggedUserPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userModel.findByIdAndUpdate(
        req.user?._id,
        {
            password: await bcrypt.hash(req.body.password, 13),
            passwordChangedAt: Date.now(),
        },
        { new: true }
    );
    const token: string = createToken(user?._id, user?.role!);
    res.status(200).json({ message: 'password changed successfully', token });
});
