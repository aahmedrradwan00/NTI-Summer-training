import { model, Schema } from 'mongoose';
import { Products } from '../interfaces/products';

const ProductsSchema: Schema = new Schema<Products>(
    {
        name: { type: String, required: true, unique: true, trim: true },
        description: { type: String, required: true, trim: true, minlength: 10, maxlength: 500 },
        price: { type: Number, required: true, min: 1, max: 1000000 },
        priceAfterDiscount: { type: Number, required: true, min: 1, max: 1000000 },
        quantity: { type: Number, default: 0, min: 0 },
        sold: { type: Number, default: 0 },
        cover: { type: String, default: '' },
        images: [String], 
        ratingAverage: { type: Number, default: 0, min:0, max: 5 }, // Average rating between 0 and 5
        ratingCount: { type: Number, default: 0, min: 0 },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        subcategory: { type: Schema.Types.ObjectId, required: true, ref: 'SubCategory' },
    },
    { timestamps: true }
);

ProductsSchema.pre<Products>(/^find/, function (next) {
    this.populate({
        path: 'category',
        select: 'name -_id',
    });
    next();
});

export default model<Products>('Products', ProductsSchema);
