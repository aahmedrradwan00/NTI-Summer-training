import { Document } from 'mongoose';
import { User } from './user';
import { Products } from './products';

export interface CartItem extends Document {
    product: Products;
    quantity: number;
    price: number;
}

export interface Carts extends Document {
    cartItems: CartItem[];
    totalPrice: number;
    totalPriceAfterDiscount: number | undefined;
    user: User;
}
