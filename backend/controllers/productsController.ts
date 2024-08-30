import { createOne, deleteOne, getAll, getOne, updateOne } from './refactorHandler';
import { NextFunction, Request, Response } from 'express';
import { Products } from '../interfaces/products';
import Product from '../models/productsModel';
import asyncHandler from 'express-async-handler';
import sharp from 'sharp';
import { uploadMultiImages } from '../middlewares/uploadsImages';

export const uploadProductImages = uploadMultiImages([
    { name: 'cover', maxCount: 1 },
    { name: 'images', maxCount: 5 }
  ])

export const resizeImage = asyncHandler(async (req: Request, res: Response, next: NextFunction)  => {
    if (req.files) {
        if (req.files.cover) {
            const coverName: string = `Product-${Date.now()}-cover.png`;
            await sharp(req.files.cover[0].buffer).toFormat('png').png({ quality: 90 }).toFile(`uploads/products/${coverName}`);
            req.body.cover = coverName;
        }
        if (req.files.images) {
            req.body.images = [];
            req.files.images.map(async (img: any, index: number) => {
                const imageName: string = `Product-${Date.now()}N${index+1}.png`;
                await sharp(img.buffer).toFormat('png').png({ quality: 90 }).toFile(`uploads/products/${imageName}`);
                req.body.images.push(imageName);
            });
        }
    }
    next();
});

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
