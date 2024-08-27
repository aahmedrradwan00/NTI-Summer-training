"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.getCategories = exports.createCategory = void 0;
const categoriesModel_1 = __importDefault(require("../models/categoriesModel"));
const refactorHandler_1 = require("./refactorHandler");
//create category
exports.createCategory = (0, refactorHandler_1.createOne)(categoriesModel_1.default);
//get all Categories
exports.getCategories = (0, refactorHandler_1.getAll)(categoriesModel_1.default, "Category");
//get one Category
exports.getCategory = (0, refactorHandler_1.getOne)(categoriesModel_1.default);
//update one Category
exports.updateCategory = (0, refactorHandler_1.updateOne)(categoriesModel_1.default);
// delete category
exports.deleteCategory = (0, refactorHandler_1.deleteOne)(categoriesModel_1.default);
