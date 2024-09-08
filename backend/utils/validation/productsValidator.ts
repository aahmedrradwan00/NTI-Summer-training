import { RequestHandler } from 'express';
import vaildatorMiddleware from '../../middlewares/validatorMiddleware';
import { param, body, check } from 'express-validator';
import Category from '../../models/categoriesModel';
import SubCategory from '../../models/subCategoriesModel';
import { SubCategories } from '../../interfaces/subCategories';
import mongoose from 'mongoose';
export const createProductsValidator: RequestHandler[] = [
    check('name').notEmpty().withMessage('Product name is required').isLength({ min: 2, max: 50 }).withMessage('Product name must be between 2 and 50 characters'),

    check('description').notEmpty().withMessage('Description is required').isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),

    check('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number').isFloat({ min: 1, max: 1000000 }).withMessage('Price must be between 1 and 1,000,000'),

    check('priceAfterDiscount').optional().isNumeric().withMessage('Price after discount must be a number').isFloat({ min: 1, max: 1000000 }).withMessage('Price after discount must be between 1 and 1,000,000'),

    check('quantity').optional().isNumeric().withMessage('Quantity must be a number').isInt({ min: 0 }).withMessage('Quantity must be 0 or greater'),

    check('sold').optional().isNumeric().withMessage('Sold must be a number').isInt({ min: 0 }).withMessage('Sold must be 0 or greater'),

    check('cover').optional().isURL().withMessage('Cover must be a valid URL'),

    check('images')
        .optional()
        .isArray()
        .withMessage('Images must be an array of strings')
        .custom((value: string[]) => {
            // Explicitly type 'value' as an array of strings
            if (value && !value.every((img: string) => typeof img === 'string' && /^https?:\/\/[^\s]+$/.test(img))) {
                throw new Error('Each image URL must be a valid URL');
            }
            return true;
        }),

    check('ratingAverage').optional().isNumeric().withMessage('Rating average must be a number').isFloat({ min: 1, max: 5 }).withMessage('Rating average must be between 0 and 5'),

    check('ratingCount').optional().isNumeric().withMessage('Rating count must be a number').isInt({ min: 0 }).withMessage('Rating count must be 0 or greater'),

    check('category')
        .notEmpty()
        .withMessage('Category is required')
        .isMongoId()
        .withMessage('Category must be a valid MongoDB ID')
        .custom(async (val) => {
            const category = await Category.findById(val); // Assuming you have a Category model
            if (!category) throw new Error('Category not found');
            return true;
        }),

    check('subcategory')
        .notEmpty()
        .withMessage('Subcategory is required')
        .isMongoId()
        .withMessage('Subcategory must be a valid MongoDB ID')
        .custom(async (val, { req }) => {
            const subcategory: SubCategories | null = await SubCategory.findById(val);
            if (!subcategory) throw new Error('Subcategory not found');
            if (subcategory.category._id!.toString() !== req.body.category.toString()) throw new Error('Subcategory does not belong to the specified category');
            return true;
        }),
    vaildatorMiddleware,
];
export const updateProductsValidator: RequestHandler[] = [check('name').optional(), check('product').optional().isMongoId().withMessage('product is required'), vaildatorMiddleware];

export const getProductsValidator: RequestHandler[] = [param('id').isMongoId().withMessage('wrong Id'), vaildatorMiddleware];
export const deleteProductsValidator: RequestHandler[] = [param('id').isMongoId().withMessage('wrong Id'), vaildatorMiddleware];
