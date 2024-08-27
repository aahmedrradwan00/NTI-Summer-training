"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.createProducts = exports.upload = void 0;
const refactorHandler_1 = require("./refactorHandler");
const products_1 = __importDefault(require("../models/products"));
const multer_1 = __importDefault(require("multer"));
const apiErrors_1 = __importDefault(require("../utils/apiErrors"));
const multerStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `Product-${Date.now()}-cover.${ext}`;
        cb(null, fileName);
    },
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image'))
        cb(null, true);
    else
        cb(new apiErrors_1.default('please upload image only', 400), false);
};
exports.upload = (0, multer_1.default)({ storage: multerStorage, fileFilter: multerFilter });
//create category
exports.createProducts = (0, refactorHandler_1.createOne)(products_1.default);
//get all Products
exports.getProducts = (0, refactorHandler_1.getAll)(products_1.default, 'Product');
//get one Products
exports.getProduct = (0, refactorHandler_1.getOne)(products_1.default);
//update one Products
exports.updateProduct = (0, refactorHandler_1.updateOne)(products_1.default);
// delete Products
exports.deleteProduct = (0, refactorHandler_1.deleteOne)(products_1.default);
