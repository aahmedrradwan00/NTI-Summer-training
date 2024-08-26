import { Request, Response, NextFunction } from 'express';
import SubCategory from '../models/subCategoriesModel';
import asyncHandler from 'express-async-handler';
import { SubCategories } from '../interfaces/subCategories';
import ApiErrors from '../utils/apiErrors';

//create SubCategory
export const createSubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const subcategory: SubCategories = await SubCategory.create(req.body);
    res.status(201).json({ data: subcategory });
});

//get all SubCategories
export const getsubCategories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const subcategories = await SubCategory.find();
    res.status(200).json({ data: subcategories });
});

//get one SubCategory
export const getSubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const subcategory = await SubCategory.findById(req.params.id);
    if (!subcategory) return next(new ApiErrors('subcategory not found', 404));
    res.status(200).json({ data: subcategory });
});

//update one SubCategory
export const updateSubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subcategory) return next(new ApiErrors('subcategory not found', 404));
    res.status(200).json({ data: subcategory });
});

// delete SubCategory
export const deleteSubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subcategory) return next(new ApiErrors('subcategory not found', 404));
    res.status(204);
});
