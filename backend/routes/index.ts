import { Application, NextFunction, Request, Response } from 'express';
import CategoriesRouter from './categoriesRoute';
import SubCategoriesRouter from './subcategoriesRoute';
import ApiErrors from '../utils/apiErrors';
import globalError from '../middlewares/globalErrors';

const mountRoutes = (app: Application): void => {
    app.use('/api/v1/categories', CategoriesRouter);
    app.use('/api/v1/subcategories', SubCategoriesRouter);
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        next(new ApiErrors(`The router ${req.originalUrl}`, 400));
        // const err = new Error('Cant find route');
        // next(err.message);
    });
    app.use(globalError);
};

export default mountRoutes;
