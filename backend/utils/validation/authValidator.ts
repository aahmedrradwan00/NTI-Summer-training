import { RequestHandler } from 'express';
import validatorMiddleware from '../../middlewares/validatorMiddleware';
import { param, body, check } from 'express-validator';
import SubCategory from '../../models/subCategoriesModel';
import { SubCategories } from '../../interfaces/subCategories';
import subCategoriesModel from '../../models/subCategoriesModel';

export const signupValidator: RequestHandler[] = [
    check('name').notEmpty().withMessage('Name is required').isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    check('email').isEmail().withMessage('Please provide a valid email'),
    // check('role').isIn(['admin', 'manager', 'user']).withMessage('Role must be either admin, manager, or user'),
    check('password').isLength({ min: 6, max: 20 }).withMessage('Passwordmust be between 6 and 20 characters'),
    check('confirmPassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match'),
    validatorMiddleware,
];

// Login Validator
export const loginValidator: RequestHandler[] = [
    check('email').isEmail().withMessage('Please provide a valid email'),
    check('password').notEmpty().withMessage('Password is required').isLength({ min: 6, max: 20 }).withMessage('Passwordmust be between 6 and 20 characters'),
    validatorMiddleware,
];
