"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SubCategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true },
}, { timestamps: true });
SubCategorySchema.pre(/^find/, function (next) {
    this.populate({
        path: 'category',
        select: 'name _id',
    });
    next();
});
exports.default = (0, mongoose_1.model)('SubCategory', SubCategorySchema);
