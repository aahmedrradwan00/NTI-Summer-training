import { model, Schema } from 'mongoose';
import { Carts } from '../interfaces/carts';

const cartsSchema: Schema = new Schema<Carts>(
    {
        cartItems: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'Products' },
                quantity: { type: Number, required: true, default: 1 },
                price: { type: Number, required: true },
            },
        ],
        totalPrice: { type: Number },
        totalPriceAfterDiscount: { type: Number },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

cartsSchema.pre<Carts>(/^find/, function (next) {
    this.populate({
        path: 'cartItems.product',
        select: 'name price cover',
    });
    next();
});

export default model<Carts>('Carts', cartsSchema);
