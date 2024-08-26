"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubcategoryValidator = exports.getSubcategoryValidator = exports.updateSubcategoryValidator = exports.createSubcategoryValidator = void 0;
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const express_validator_1 = require("express-validator");
exports.createSubcategoryValidator = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('Subcategory name is required').isLength({ min: 2, max: 50 }),
    (0, express_validator_1.check)('category').notEmpty().withMessage('category  is required').isMongoId().withMessage('category is required'),
    validatorMiddleware_1.default,
];
exports.updateSubcategoryValidator = [(0, express_validator_1.check)('name').optional(), (0, express_validator_1.check)('category').optional().isMongoId().withMessage('category is required'), validatorMiddleware_1.default];
exports.getSubcategoryValidator = [(0, express_validator_1.param)('id').isMongoId().withMessage('wrong Id'), validatorMiddleware_1.default];
exports.deleteSubcategoryValidator = [(0, express_validator_1.param)('id').isMongoId().withMessage('wrong Id'), validatorMiddleware_1.default];
