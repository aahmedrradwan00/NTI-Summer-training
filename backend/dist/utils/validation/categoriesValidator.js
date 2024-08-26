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
exports.deleteCategoryValidator = exports.getCategoryValidator = exports.updateCategoryValidator = exports.createCategoryValidator = void 0;
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const express_validator_1 = require("express-validator");
const subCategoriesModel_1 = __importDefault(require("../../models/subCategoriesModel"));
exports.createCategoryValidator = [(0, express_validator_1.check)('name').notEmpty().withMessage('Category name is required').isLength({ min: 2, max: 50 }), validatorMiddleware_1.default];
exports.updateCategoryValidator = [(0, express_validator_1.check)('name').notEmpty().withMessage('category name is required'), validatorMiddleware_1.default];
exports.getCategoryValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('Invalid ID format'),
    validatorMiddleware_1.default
];
exports.deleteCategoryValidator = [
    (0, express_validator_1.param)('id')
        .isMongoId()
        .withMessage('wrong Id')
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const subcatrgorise = yield subCategoriesModel_1.default.find({ category: val });
        if (subcatrgorise.length) {
        }
    })),
    validatorMiddleware_1.default,
];
