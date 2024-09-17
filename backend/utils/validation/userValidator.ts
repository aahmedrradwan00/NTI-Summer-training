import { RequestHandler } from 'express';
import validatorMiddleware from '../../middlewares/validatorMiddleware';
import { param, body, check } from 'express-validator';
import userModel from '../../models/userModel';
import bcrypt from 'bcryptjs';

export const createUserValidator: RequestHandler[] = [
    check('name').notEmpty().withMessage('User name is required').isLength({ min: 2, max: 50 }),
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .custom(async (val) => {
            const user = await userModel.findOne({ email: val });
            if (user) throw new Error('email is exit');
            return true;
        }),

    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6, max: 20 })
        .withMessage('Password must be between 6 and 20 characters')
        .custom(async (val: string, { req }) => {
            if (val !== req.body.confirmPassword) throw new Error('Passwords do not match');
        }),
    check('confirmPassword').notEmpty().withMessage('confirmPassword is required').isLength({ min: 6, max: 20 }).withMessage('confirmPassword must be between 6 and 20 characters'),
    check('role').notEmpty().withMessage('Role is required').isIn(['manager', 'admin', 'user']).withMessage('Role must be either manager, admin, or user'),
    // check('address')
    //     .notEmpty()
    //     .withMessage('Address is required')
    //     .custom((val) => {
    //         if (!val.street || !val.city || !val.country) throw new Error('Street, city, and country are required in the address');
    //         return true;
    //     }),
    validatorMiddleware,
];

export const updateUserValidator: RequestHandler[] = [check('name').optional().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'), validatorMiddleware];

export const getUserValidator: RequestHandler[] = [check('id').isMongoId().withMessage('Invalid ID format'), validatorMiddleware];
export const deleteUserValidator: RequestHandler[] = [param('id').isMongoId().withMessage('wrong Id'), validatorMiddleware];

export const changeUserPasswordValidator: RequestHandler[] = [
    check('password')
        .notEmpty()
        .withMessage('password required')
        .isLength({ min: 6, max: 20 })
        .withMessage('password length must between 6 and 20 char')
        .custom((val: string, { req }) => {
            if (val !== req.body.confirmPassword) {
                throw new Error("passwords doesn't match");
            }
            return true;
        }),
    check('confirmPassword').notEmpty().withMessage('confirm password required').isLength({ min: 6, max: 20 }).withMessage('confirm password length must between 6 and 20 char'),
    validatorMiddleware,
];

export const updateLoggedUserValidator: RequestHandler[] = [check('name').optional().isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50'), validatorMiddleware];

export const changeLoggedUserPasswordValidator: RequestHandler[] = [
    check('currentPassword').notEmpty().withMessage('current password required').isLength({ min: 6, max: 20 }).withMessage('current password length must between 6 and 20 char'),
    check('password')
        .notEmpty()
        .withMessage('password required')
        .isLength({ min: 6, max: 20 })
        .withMessage('password length must between 6 and 20 char')
        .custom(async (val: string, { req }) => {
            const user = await userModel.findById(req.user._id);
            const isCorrectPassword: boolean = await bcrypt.compare(req.body.currentPassword, user!.password);
            if (!isCorrectPassword) throw new Error('current password invalid');
            if (val !== req.body.confirmPassword) throw new Error("passwords doesn't match");
            return true;
        }),
    check('confirmPassword').notEmpty().withMessage('confirm password required').isLength({ min: 6, max: 20 }).withMessage('confirm password length must between 6 and 20 char'),
    validatorMiddleware,
];
