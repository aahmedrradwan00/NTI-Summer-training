import { Router } from 'express';
import { createSubCategory, getSubCategory, getsubCategories, updateSubCategory, deleteSubCategory, filterData } from '../controllers/subCategoriesController';
import { createSubcategoryValidator, deleteSubcategoryValidator, getSubcategoryValidator } from '../utils/validation/subcategoriesValidator';

const SubCategoriesRouter: Router = Router({ mergeParams: true });

SubCategoriesRouter.route('/').get(filterData, getsubCategories).post(createSubcategoryValidator, createSubCategory);
SubCategoriesRouter.route('/:id').get(getSubcategoryValidator, getSubCategory).put(updateSubCategory).delete(deleteSubcategoryValidator, deleteSubCategory);

export default SubCategoriesRouter;
