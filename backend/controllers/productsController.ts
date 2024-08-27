import { createOne, deleteOne, getAll, getOne, updateOne } from './refactorHandler';
import { NextFunction, Request, Response } from "express";
import { Products } from '../interfaces/products';
import Product from '../models/products';
import multer from 'multer';
import ApiErrors from '../utils/apiErrors';

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `Product-${Date.now()}-cover.${ext}`;
        cb(null, fileName);
    },
});

const multerFilter = (req: Request, file: any, cb: any) => {
    if (file.mimetype.startsWith('image')) cb(null, true);
    else cb(new ApiErrors('please upload image only', 400), false);
};

export const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

//create category
export const createProducts = createOne<Products>(Product);

//get all Products
export const getProducts = getAll<Products>(Product, 'Product');

//get one Products
export const getProduct = getOne<Products>(Product);

//update one Products

export const updateProduct = updateOne<Products>(Product);

// delete Products
export const deleteProduct = deleteOne<Products>(Product);
