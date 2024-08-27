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
exports.deleteOne = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const apiErrors_1 = __importDefault(require("../utils/apiErrors"));
const features_1 = __importDefault(require("../utils/features"));
const getAll = (model, modelName) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let filterDate = {};
    let searchLength = 0;
    if (req.filterDate)
        filterDate = req.filterDate;
    // if(req.query){
    //     const searchRessult: Features = new Features(model.find(filterDate), req.query).filter().search(modelName);
    //     const searchData:modelType[] = await searchRessult.mongooseQuery ;
    //     searchLength=searchData.length
    // }
    // const countDocuments: number = searchLength||await model.find(filterDate).countDocuments();
    let apiFeatures = new features_1.default(model.find(filterDate), req.query).filter().sort().limitFildes().search(modelName);
    const { mongooseQuery } = apiFeatures;
    let doc = yield apiFeatures.mongooseQuery;
    searchLength = doc.length;
    apiFeatures = new features_1.default(mongooseQuery, req.query).pageination(searchLength);
    res.status(200).json({ length: doc.length, pagination: apiFeatures.paginationResult, data: doc });
}));
exports.getAll = getAll;
const getOne = (model) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield model.findById(req.params.id);
    if (!doc)
        return next(new apiErrors_1.default('Document not found', 404));
    res.status(200).json({ data: doc });
}));
exports.getOne = getOne;
const createOne = (model) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield model.create(req.body);
    res.status(200).json({ data: doc });
}));
exports.createOne = createOne;
const updateOne = (model) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc)
        return next(new apiErrors_1.default('Document not found', 404));
    res.status(200).json({ data: doc });
}));
exports.updateOne = updateOne;
const deleteOne = (model) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield model.findByIdAndDelete(req.params.id);
    if (!doc)
        return next(new apiErrors_1.default('Document not found', 404));
    res.status(204).json({ data: doc });
}));
exports.deleteOne = deleteOne;
