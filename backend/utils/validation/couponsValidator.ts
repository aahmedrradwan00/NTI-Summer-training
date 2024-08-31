import { RequestHandler } from 'express';
import validatorMiddleware from '../../middlewares/validatorMiddleware';
import { param, body, check } from 'express-validator';
import couponsModel from '../../models/couponsModel';

export const createCouponValidator: RequestHandler[] = [
    check('name')
        .notEmpty()
        .withMessage('Coupon name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Coupon name must be between 2 and 50 characters')
        .custom(async (val: string) => {
            const coupon = await couponsModel.find({ name: val });
            if (!coupon) throw new Error('coupon name alrady exit');
            return true;
        }),
    check('expireTime').notEmpty().withMessage('Expire time is required').isDate().withMessage('Expire time must be a valid date'),
    check('discount').notEmpty().withMessage('Discount is required').isInt({ min: 1, max: 100 }).withMessage('Discount must be a number between 1 and 100'),
    validatorMiddleware,
];

export const updateCouponValidator: RequestHandler[] = [
    check('name').optional().isLength({ min: 2, max: 50 }).withMessage('Coupon name must be between 2 and 50 characters'),
    check('expireTime').optional().isDate().withMessage('Expire time must be a valid date'),
    check('discount').notEmpty().withMessage('Discount is required').isInt({ min: 1, max: 100 }).withMessage('Discount must be a number between 1 and 100'),
    validatorMiddleware,
];

export const getCouponValidator: RequestHandler[] = [check('id').isMongoId().withMessage('Invalid ID format'), validatorMiddleware];
export const deleteCouponValidator: RequestHandler[] = [param('id').isMongoId().withMessage('wrong Id'), validatorMiddleware];
