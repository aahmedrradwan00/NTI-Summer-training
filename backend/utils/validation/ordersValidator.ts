import { RequestHandler } from 'express';
import validatorMiddleware from '../../middlewares/validatorMiddleware';
import { check } from 'express-validator';

// Validator for creating an order
export const createOrderValidator: RequestHandler[] = [check('address').optional(), validatorMiddleware];

export const isOrderPaidValidator: RequestHandler[] = [check('id').isMongoId().withMessage('Invalid order ID'), validatorMiddleware];

export const isOrderDeliveredValidator: RequestHandler[] = [check('id').isMongoId().withMessage('Invalid order ID'), validatorMiddleware];
