"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductsSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true, minlength: 10, maxlength: 500 },
    price: { type: Number, required: true, min: 1, max: 1000000 },
    priceAfterDiscount: { type: Number, required: true, min: 1, max: 1000000 },
    quantity: { type: Number, default: 0, min: 0 },
    sold: { type: Number, default: 0 },
    cover: { type: String, default: '' },
    images: [String],
    ratingAverage: { type: Number, default: 0, min: 0, max: 5 }, // Average rating between 0 and 5
    ratingCount: { type: Number, default: 0, min: 0 },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'SubCategory' },
}, { timestamps: true });
ProductsSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'category',
        select: 'name -_id',
    });
    next();
});
exports.default = (0, mongoose_1.model)('Products', ProductsSchema);
