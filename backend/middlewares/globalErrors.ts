import { NextFunction, Request, Response } from 'express';
import { CustomErrors } from '../interfaces/customErrors';

//global Error midelware
const globalError = (err: CustomErrors, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';
    res.status(err.statusCode).json(process.env.NODE_ENV === 'development' ? { error: err, message: err.message, stack: err.stack } : { status: err.status, message: err.message });
};

export default globalError;
