import ApiErrors from '../utils/apiErrors';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { ImageFields } from '../interfaces/uploadFildes';

const imageUpload = (): multer.Multer => {
    // const multerStorage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, 'uploads');
    //     },
    //     filename: function (req, file, cb) {
    //         const ext = file.mimetype.split('/')[1];
    //         const fileName = `Product-${Date.now()}-cover.${ext}`;
    //         cb(null, fileName);
    //     },
    // });
    const multerStorage: multer.StorageEngine = multer.memoryStorage();

    const multerFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        if (file.mimetype.startsWith('image')) cb(null, true);
        else cb(new ApiErrors('please upload image only', 400));
    };
    return multer({ storage: multerStorage, fileFilter: multerFilter });
};

export const uploadSingleImages = (fileName: string) => imageUpload().single(fileName);
export const uploadMultiImages = (fields: ImageFields[])=>imageUpload().fields(fields)
