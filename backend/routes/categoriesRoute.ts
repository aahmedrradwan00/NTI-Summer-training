import { Router } from 'express';
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from '../controllers/categoriesController';
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from '../utils/validation/categoriesValidator';
import { allowedTo, checkActive, protectRoutes } from '../controllers/authController';
const CategoriesRouter: Router = Router();

CategoriesRouter.use('/:categoryId/subcategories', CategoriesRouter);

CategoriesRouter.route('/').get(getCategories).post(protectRoutes, checkActive, allowedTo('manager', 'admin'), createCategoryValidator, createCategory);
CategoriesRouter.route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(protectRoutes, checkActive, allowedTo('manager', 'admin'), updateCategoryValidator, updateCategory)
    .delete(protectRoutes, checkActive, allowedTo('manager', 'admin'), deleteCategoryValidator, deleteCategory);

export default CategoriesRouter;
