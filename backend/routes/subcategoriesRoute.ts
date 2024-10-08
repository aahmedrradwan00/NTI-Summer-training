import { Router } from 'express';
import { createSubCategory, getSubcategory, getSubCategories, updateSubcategory, deleteSubcategory, filterData } from '../controllers/subCategoriesController';
import { createSubcategoryValidator, deleteSubcategoryValidator, getSubcategoryValidator, updateSubcategoryValidator } from '../utils/validation/subcategoriesValidator';
import { allowedTo, checkActive, protectRoutes } from '../controllers/authController';

const SubCategoriesRouter: Router = Router({ mergeParams: true });

// Get or create subcategories 
SubCategoriesRouter.route('/').get(filterData, getSubCategories).post(protectRoutes, checkActive, allowedTo('manager', 'admin'), createSubcategoryValidator, createSubCategory);

// Get, update, or delete a subcategory by ID 
SubCategoriesRouter.route('/:id')
    .get(getSubcategoryValidator, getSubcategory)
    .put(protectRoutes, checkActive, allowedTo('manager', 'admin'), updateSubcategoryValidator, updateSubcategory)
    .delete(protectRoutes, checkActive, allowedTo('manager', 'admin'), deleteSubcategoryValidator, deleteSubcategory);

export default SubCategoriesRouter;
