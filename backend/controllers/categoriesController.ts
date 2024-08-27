import Category from '../models/categoriesModel';
import { Categories } from '../interfaces/categories';
import { createOne, deleteOne, getAll, getOne, updateOne } from './refactorHandler';


//create category
export const createCategory = createOne<Categories>(Category);

//get all Categories
export const getCategories = getAll<Categories>(Category,"Category");

//get one Category
export const getCategory = getOne<Categories>(Category);

//update one Category

export const updateCategory = updateOne<Categories>(Category);

// delete category
export const deleteCategory = deleteOne<Categories>(Category);
