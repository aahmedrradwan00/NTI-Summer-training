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
exports.deleteSubcategoryValidator = exports.getSubcategoryValidator = exports.updateSubcategoryValidator = exports.createSubcategoryValidator = void 0;
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const express_validator_1 = require("express-validator");
const categoriesModel_1 = __importDefault(require("../../models/categoriesModel"));
exports.createSubcategoryValidator = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('Subcategory name is required').isLength({ min: 2, max: 50 }),
    (0, express_validator_1.check)('category')
        .notEmpty()
        .withMessage('category  is required')
        .isMongoId()
        .withMessage('category is required')
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield categoriesModel_1.default.findById(val);
        if (!category)
            throw new Error('Category not found');
        return true;
    })),
    validatorMiddleware_1.default,
];
exports.updateSubcategoryValidator = [(0, express_validator_1.check)('name').optional(), (0, express_validator_1.check)('category').optional().isMongoId().withMessage('category is required'), validatorMiddleware_1.default];
exports.getSubcategoryValidator = [(0, express_validator_1.param)('id').isMongoId().withMessage('wrong Id'), validatorMiddleware_1.default];
exports.deleteSubcategoryValidator = [(0, express_validator_1.param)('id').isMongoId().withMessage('wrong Id'), validatorMiddleware_1.default];
