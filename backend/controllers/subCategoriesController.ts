import { Request, Response, NextFunction } from 'express';
import SubCategory from '../models/subCategoriesModel';
import asyncHandler from 'express-async-handler';
import { SubCategories } from '../interfaces/subCategories';
import ApiErrors from '../utils/apiErrors';
import { FilterData } from '../interfaces/filterData';
import { createOne, deleteOne, getAll, getOne, updateOne } from './refactorHandler';

export const filterData = (req: Request, res: Response, next: NextFunction) => {
    let filterData: FilterData = {};
    if (req.params.categoryId) filterData.category = req.params.categoryId;
    req.filterDate = filterData;
    next();
};

//create SubCategory
export const createSubCategory = createOne<SubCategories>(SubCategory)
//get all SubCategories
export const getSubCategories = getAll<SubCategories>(SubCategory, 'subcategories')
//get one SubCategory
export const getSubcategory = getOne<SubCategories>(SubCategory)
//update one SubCategory
export const updateSubcategory = updateOne<SubCategories>(SubCategory)
// delete SubCategory
export const deleteSubcategory = deleteOne<SubCategories>(SubCategory)