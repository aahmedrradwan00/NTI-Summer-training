import asyncHandler from 'express-async-handler';
import { User } from '../interfaces/user';
import userModel from '../models/userModel';
import { createOne, deleteOne, getAll, getOne, updateOne } from './refactorHandler';
import { Request, Response, NextFunction } from 'express';
import ApiErrors from '../utils/apiErrors';
import { uploadSingleImages } from '../middlewares/uploadsImages';
import sharp from 'sharp';
import bcrypt from 'bcryptjs';
//create User
export const createUser = createOne<User>(userModel);

//get all User
export const getUsers = getAll<User>(userModel, 'User');

//get one User
export const getUser = getOne<User>(userModel);

//update one User

export const updateUser = asyncHandler(async (req: Request, res: any, next: any) => {
    const { name, image, active } = req.body;
    const user = await userModel.findByIdAndUpdate(req.params.id, {
        name,
        image,
        active,
    });
    if (!user) return next(new ApiErrors('user not found', 404));
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
