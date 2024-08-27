"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subCategoriesController_1 = require("../controllers/subCategoriesController");
const subcategoriesValidator_1 = require("../utils/validation/subcategoriesValidator");
const SubCategoriesRouter = (0, express_1.Router)({ mergeParams: true });
SubCategoriesRouter.route('/').get(subCategoriesController_1.filterData, subCategoriesController_1.getsubCategories).post(subcategoriesValidator_1.createSubcategoryValidator, subCategoriesController_1.createSubCategory);
SubCategoriesRouter.route('/:id').get(subcategoriesValidator_1.getSubcategoryValidator, subCategoriesController_1.getSubCategory).put(subCategoriesController_1.updateSubCategory).delete(subcategoriesValidator_1.deleteSubcategoryValidator, subCategoriesController_1.deleteSubCategory);
exports.default = SubCategoriesRouter;
