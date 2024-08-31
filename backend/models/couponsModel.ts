import { model, Schema } from 'mongoose';
import { Coupons } from './../interfaces/coupons';

const CouponsSchema: Schema = new Schema<Coupons>(
    {
        name: { type: String, required: true, unique: true, trim: true },
        expireTime: { type: Date, required: true },
        discount: { type: Number, required: true, min: 1, max: 100 },
        
    },
    { timestamps: true }
);

export default model<Coupons>('Coupon', CouponsSchema);
