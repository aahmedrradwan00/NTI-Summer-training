import * as all from '../interfaces';
import { Application, NextFunction, Request, Response } from 'express';
import CategoriesRouter from './categoriesRoute';
import SubCategoriesRouter from './subcategoriesRoute';
import ApiErrors from '../utils/apiErrors';
import globalError from '../middlewares/globalErrors';
import ProductsRouter from './prodectsRoute';
import UserRouter from './userRoute';
import authRouter from './authRoute';
import reviewsRouter from './reviewsRoute';
import wishlistRouter from './wishlistRoute';
import couponsRouter from './couponsRoute';
import CartsRouter from './cartRoute';
import OrdersRouter from './ordersRoute';
const mountRoutes = (app: Application): void => {
    app.use('/api/v1/categories', CategoriesRouter);
    app.use('/api/v1/subcategories', SubCategoriesRouter);
    app.use('/api/v1/products', ProductsRouter);
    app.use('/api/v1/users', UserRouter);
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/reviews', reviewsRouter);
    app.use('/api/v1/wishlist', wishlistRouter);
    app.use('/api/v1/coupons', couponsRouter);
    app.use('/api/v1/carts', CartsRouter);
    app.use('/api/v1/orders', OrdersRouter);
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        next(new ApiErrors(`The router ${req.originalUrl}`, 400));
        // const err = new Error('Cant find route');
        // next(err.message);
    });
    app.use(globalError);
};

export default mountRoutes;
