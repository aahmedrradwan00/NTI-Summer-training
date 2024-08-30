import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import ApiErrors from '../utils/apiErrors';
import mongoose from 'mongoose';
import { FilterData } from '../interfaces/filterData';
import Features from '../utils/features';

export const getAll = <modelType>(model: mongoose.Model<any>, modelName: string) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let filterDate: FilterData = {};
        let searchLength: number = 0;
        if (req.filterDate) filterDate = req.filterDate;
        // if(req.query){
        //     const searchRessult: Features = new Features(model.find(filterDate), req.query).filter().search(modelName);
        //     const searchData:modelType[] = await searchRessult.mongooseQuery ;
        //     searchLength=searchData.length
        // }
        // const countDocuments: number = searchLength||await model.find(filterDate).countDocuments();
        let apiFeatures: Features = new Features(model.find(filterDate), req.query).filter().sort().limitFildes().search(modelName);
        const { mongooseQuery } = apiFeatures;
        let doc: modelType[] = await apiFeatures.mongooseQuery;
        searchLength = doc.length;
        apiFeatures = new Features(mongooseQuery, req.query).pageination(searchLength);
        res.status(200).json({ length: doc.length, pagination: apiFeatures.paginationResult, data: doc });
    });

export const getOne = <modelType>(model: mongoose.Model<any>) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await model.findById(req.params.id);
        if (!doc) return next(new ApiErrors('Document not found', 404));
        res.status(200).json({ data: doc });
    });

export const createOne = <modelType>(model: mongoose.Model<any>) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const doc: modelType = await model.create(req.body);
        res.status(200).json({ data: doc });
    });

export const updateOne = <modelType>(model: mongoose.Model<any>) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!doc) return next(new ApiErrors('Document not found', 404));
        doc.save();
        res.status(200).json({ data: doc });
    });

export const deleteOne = <modelType>(model: mongoose.Model<any>) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await model.findByIdAndDelete(req.params.id);
        if (!doc) return next(new ApiErrors('Document not found', 404));
        doc.remove();
        res.status(204).json({ data: doc });
    });
