"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';
    res.status(err.statusCode).json(process.env.NODE_ENV === 'development' ? { error: err, message: err.message, stack: err.stack } : { status: err.status, message: err.message });
};
exports.default = globalError;
