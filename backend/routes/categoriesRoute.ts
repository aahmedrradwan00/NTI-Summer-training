import { Router } from 'express';
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from '../controllers/categoriesController';
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from '../utils/validation/categoriesValidator';
const CategoriesRouter: Router = Router();

CategoriesRouter.use('/:categoryId/subcategories', CategoriesRouter);

CategoriesRouter.route('/').get(getCategories).post(createCategoryValidator, createCategory);
CategoriesRouter.route('/:id').get(getCategoryValidator, getCategory).put(updateCategoryValidator, updateCategory).delete(deleteCategoryValidator, deleteCategory);

export default CategoriesRouter;
