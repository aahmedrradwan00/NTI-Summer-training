import { RequestHandler } from 'express';
import validatorMiddleware from '../../middlewares/validatorMiddleware';
import { check } from 'express-validator';

export const addProductToCartValidator: RequestHandler[] = [check('product').notEmpty().withMessage('product is required').isMongoId().withMessage('product id not vaild'), validatorMiddleware];

export const removeProductFromCartValidator: RequestHandler[] = [
    check('itemId').isMongoId().withMessage('invalid mongo id'),
    validatorMiddleware
  ]
  
export const updateProductQuantityValidator: RequestHandler[] = [
    check('itemId').isMongoId().withMessage('invalid mongo id'),
    check('quantity')
        .notEmpty()
        .withMessage('Quantity required')
        .isNumeric()
        .withMessage('quantity must be number')
        .toInt()
        .custom((val: number) => {
            if (val < 1) throw new Error('invalid quantity');
            return true;
        }),
    validatorMiddleware,
];
