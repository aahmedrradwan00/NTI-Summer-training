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
exports.deleteProductsValidator = exports.getProductsValidator = exports.updateProductsValidator = exports.createProductsValidator = void 0;
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const express_validator_1 = require("express-validator");
const categoriesModel_1 = __importDefault(require("../../models/categoriesModel"));
const subCategoriesModel_1 = __importDefault(require("../../models/subCategoriesModel"));
exports.createProductsValidator = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('Product name is required').isLength({ min: 2, max: 50 }).withMessage('Product name must be between 2 and 50 characters'),
    (0, express_validator_1.check)('description').notEmpty().withMessage('Description is required').isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
    (0, express_validator_1.check)('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number').isFloat({ min: 1, max: 1000000 }).withMessage('Price must be between 1 and 1,000,000'),
    (0, express_validator_1.check)('priceAfterDiscount')
        .notEmpty()
        .withMessage('Price after discount is required')
        .isNumeric()
        .withMessage('Price after discount must be a number')
        .isFloat({ min: 1, max: 1000000 })
        .withMessage('Price after discount must be between 1 and 1,000,000'),
    (0, express_validator_1.check)('quantity').optional().isNumeric().withMessage('Quantity must be a number').isInt({ min: 0 }).withMessage('Quantity must be 0 or greater'),
    (0, express_validator_1.check)('sold').optional().isNumeric().withMessage('Sold must be a number').isInt({ min: 0 }).withMessage('Sold must be 0 or greater'),
    (0, express_validator_1.check)('cover').optional().isURL().withMessage('Cover must be a valid URL'),
    (0, express_validator_1.check)('images')
        .optional()
        .isArray()
        .withMessage('Images must be an array of strings')
        .custom((value) => {
        // Explicitly type 'value' as an array of strings
        if (value && !value.every((img) => typeof img === 'string' && /^https?:\/\/[^\s]+$/.test(img))) {
            throw new Error('Each image URL must be a valid URL');
        }
        return true;
    }),
    (0, express_validator_1.check)('ratingAverage').optional().isNumeric().withMessage('Rating average must be a number').isFloat({ min: 1, max: 5 }).withMessage('Rating average must be between 0 and 5'),
    (0, express_validator_1.check)('ratingCount').optional().isNumeric().withMessage('Rating count must be a number').isInt({ min: 0 }).withMessage('Rating count must be 0 or greater'),
    (0, express_validator_1.check)('category')
        .notEmpty()
        .withMessage('Category is required')
        .isMongoId()
        .withMessage('Category must be a valid MongoDB ID')
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield categoriesModel_1.default.findById(val); // Assuming you have a Category model
        if (!category)
            throw new Error('Category not found');
        return true;
    })),
    (0, express_validator_1.check)('subcategory')
        .notEmpty()
        .withMessage('Subcategory is required')
        .isMongoId()
        .withMessage('Subcategory must be a valid MongoDB ID')
        .custom((val_1, _a) => __awaiter(void 0, [val_1, _a], void 0, function* (val, { req }) {
        const subcategory = yield subCategoriesModel_1.default.findById(val);
        if (!subcategory)
            throw new Error('Subcategory not found');
        if (subcategory.category._id.toString() !== req.body.category.toString())
            throw new Error('Subcategory does not belong to the specified category');
        return true;
    })),
    validatorMiddleware_1.default,
];
exports.updateProductsValidator = [(0, express_validator_1.check)('name').optional(), (0, express_validator_1.check)('product').optional().isMongoId().withMessage('product is required'), validatorMiddleware_1.default];
exports.getProductsValidator = [(0, express_validator_1.param)('id').isMongoId().withMessage('wrong Id'), validatorMiddleware_1.default];
exports.deleteProductsValidator = [(0, express_validator_1.param)('id').isMongoId().withMessage('wrong Id'), validatorMiddleware_1.default];
