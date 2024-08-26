import { Request, Response, NextFunction } from 'express';
import Category from '../models/categoriesModel';
import { Categories } from '../interfaces/categories';
import asyncHandler from 'express-async-handler';
import ApiErrors from '../utils/apiErrors';

//create category
export const createCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const category: Categories = await Category.create(req.body);
    res.status(201).json({ data: category });
});

//get all Categories
export const getCategories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find();
    res.status(200).json({ data: categories });
});

//get one Category
export const getCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findById(req.params.id);
    if (!category) return next(new ApiErrors('category not found', 404));
    res.status(200).json({ data: category });
});

//update one Category
export const updateCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return next(new ApiErrors('category not found', 404));
    res.status(200).json({ data: category });
});

// delete category
export const deleteCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return next(new ApiErrors('category not found', 404));
    res.status(204);
});
