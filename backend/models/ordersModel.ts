import { model, Schema } from 'mongoose';
import { Orders } from '../interfaces/orders';

const ordersSchema: Schema = new Schema<Orders>(
    {
        cartItems: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, required: true, default: 1 },
                price: { type: Number, required: true },
            },
        ],
        totalPrice: Number,
        paymentMethod: { type: String, enum: ['card', 'cash'], default: 'cash' },
        deliveredAt: Date,
        isDelivered: { type: Boolean, default: false },
        paidAt: Date,
        isPaid: { type: Boolean, default: false },
        taxPrice: { type: Number, default: 0 },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        address: { type: String, required: true },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ordersSchema.pre<Orders>(/^find/, function (next) {
    this.populate({ path: 'cartItems.product', select: 'name price cover' });
    this.populate({ path: 'user', select: 'name image email' });
    next();
});

export default model<Orders>('Orders', ordersSchema);
