"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubCategory = exports.updateSubCategory = exports.getSubCategory = exports.getsubCategories = exports.createSubCategory = exports.filterData = void 0;
const subCategoriesModel_1 = __importDefault(require("../models/subCategoriesModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const apiErrors_1 = __importDefault(require("../utils/apiErrors"));
const filterData = (req, res, next) => {
    let filterData = {};
    if (req.params.categoryId)
        filterData.category = req.params.categoryId;
    req.filterDate = filterData;
    next();
};
exports.filterData = filterData;
//create SubCategory
exports.createSubCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const subcategory = yield subCategoriesModel_1.default.create(req.body);
    res.status(201).json({ data: subcategory });
}));
//get all SubCategories
exports.getsubCategories = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let filterData = {};
    if (req.params.categoryId)
        filterData.category = req.params.categoryId;
    const subcategories = yield subCategoriesModel_1.default.find(filterData);
    res.status(200).json({ data: subcategories });
}));
//get one SubCategory
exports.getSubCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const subcategory = yield subCategoriesModel_1.default.findById(req.params.id);
    if (!subcategory)
        return next(new apiErrors_1.default('subcategory not found', 404));
    res.status(200).json({ data: subcategory });
}));
//update one SubCategory
exports.updateSubCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const subcategory = yield subCategoriesModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subcategory)
        return next(new apiErrors_1.default('subcategory not found', 404));
    res.status(200).json({ data: subcategory });
}));
// delete SubCategory
exports.deleteSubCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const subcategory = yield subCategoriesModel_1.default.findByIdAndDelete(req.params.id);
    if (!subcategory)
        return next(new apiErrors_1.default('subcategory not found', 404));
    res.status(204);
}));
