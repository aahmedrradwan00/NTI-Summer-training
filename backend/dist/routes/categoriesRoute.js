"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesController_1 = require("../controllers/categoriesController");
const categoriesValidator_1 = require("../utils/validation/categoriesValidator");
const CategoriesRouter = (0, express_1.Router)();
CategoriesRouter.route('/').get(categoriesController_1.getCategories).post(categoriesValidator_1.createCategoryValidator, categoriesController_1.createCategory);
CategoriesRouter.route('/:id').get(categoriesValidator_1.getCategoryValidator, categoriesController_1.getCategory).put(categoriesValidator_1.updateCategoryValidator, categoriesController_1.updateCategory).delete(categoriesValidator_1.deleteCategoryValidator, categoriesController_1.deleteCategory);
exports.default = CategoriesRouter;
