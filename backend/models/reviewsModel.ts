import { Schema, model } from 'mongoose';
import { Reviews } from '../interfaces/reviews';
import productsModel from './productsModel';
const reviewsSchema: Schema = new Schema<Reviews>(
    {
        comment: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    },
    { timestamps: true }
);

reviewsSchema.statics.calcRatingAndQuantity = async function (productId) {
    const result = await this.aggregate([{ $match: { product: productId } }, { $group: { _id: 'product', avgRating: { $avg: '$rating' }, ratingQuantity: { $sum: 1 } } }]);
    if (result.length > 0) {
        await productsModel.findByIdAndUpdate(productId, {
            ratingAverage: result[0].avgRating,
            ratingCount: result[0].ratingQuantity,
        });
    } else {
        await productsModel.findByIdAndUpdate(productId, {
            ratingAverage: 0,
            ratingCount: 0,
        });
    }
};

reviewsSchema.post<Reviews>('save', async function () {
    await (this.constructor as any).calcRatingAndQuantity(this.product);
});

reviewsSchema.pre<Reviews>(/^find/, function (next) {
    this.populate({ path: 'user', select: 'name image' });
    next();
});

reviewsSchema.pre<Reviews>('find', function (next) {
    this.populate({ path: 'product', select: 'name cover' });
    next();
});

export default model<Reviews>('reviews', reviewsSchema)