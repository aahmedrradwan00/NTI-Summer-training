import { Document, Schema } from 'mongoose';
import { CartItem } from './carts';
import { User } from './user';

type Payment = 'cash' | 'visa';

export interface Orders extends Document {
    cartItems: CartItem;
    totalPrice: number;
    paymentMethod: Payment;
    user: User;
    deliveredAt: Date|number;
    isDelivered: boolean;
    paidAt: Date|number;
    isPaid: boolean;
    taxPrice: number;
    address: string;
}
