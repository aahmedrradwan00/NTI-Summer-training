import { Router } from 'express';
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from '../controllers/categoriesController';
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from '../utils/validation/categoriesValidator';
import { allowedTo, checkActive, protectRoutes } from '../controllers/authController';
import SubCategoriesRouter from './subcategoriesRoute';
const CategoriesRouter: Router = Router();

// Handle subcategory routes
CategoriesRouter.use('/:categoryId/subcategories', SubCategoriesRouter);

// Get or create categories 
CategoriesRouter.route('/').get(getCategories).post(protectRoutes, checkActive, allowedTo('manager', 'admin'), createCategoryValidator, createCategory);

// Get, update, or delete category by ID
CategoriesRouter.route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(protectRoutes, checkActive, allowedTo('manager', 'admin'), updateCategoryValidator, updateCategory)
    .delete(protectRoutes, checkActive, allowedTo('manager', 'admin'), deleteCategoryValidator, deleteCategory);

export default CategoriesRouter;
