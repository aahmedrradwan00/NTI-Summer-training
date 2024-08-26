import { Router } from 'express';
import { createSubCategory, getSubCategory, getsubCategories, updateSubCategory, deleteSubCategory } from '../controllers/subCategoriesController';
import { createSubcategoryValidator, deleteSubcategoryValidator, getSubcategoryValidator } from '../utils/validation/subcategoriesValidator';

const SubCategoriesRouter: Router = Router();

SubCategoriesRouter.route('/').get(getsubCategories).post(createSubcategoryValidator, createSubCategory);
SubCategoriesRouter.route('/:id').get(getSubcategoryValidator, getSubCategory).put(updateSubCategory).delete(deleteSubcategoryValidator,deleteSubCategory);

export default SubCategoriesRouter;
