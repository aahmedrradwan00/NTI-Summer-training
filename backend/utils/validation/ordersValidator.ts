import { RequestHandler } from 'express';
import validatorMiddleware from '../../middlewares/validatorMiddleware';
import { check } from 'express-validator';

// Validator for creating an order
export const createOrderValidator: RequestHandler[] = [
    check('cartItems').isArray().withMessage('cartItems must be an array'),
    check('cartItems.*.product').isMongoId().withMessage('Invalid product ID'),
    check('cartItems.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    check('cartItems.*.price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    check('totalPrice').isFloat({ gt: 0 }).withMessage('Total price must be greater than 0'),
    check('paymentMethod').isIn(['card', 'cash']).withMessage('Invalid payment method'),
    check('address').notEmpty().withMessage('Address is required'),
    validatorMiddleware,
];

export const isOrderPaidValidator: RequestHandler[] = [check('id').isMongoId().withMessage('Invalid order ID'), validatorMiddleware];

export const isOrderDeliveredValidator: RequestHandler[] = [check('id').isMongoId().withMessage('Invalid order ID'), validatorMiddleware];
