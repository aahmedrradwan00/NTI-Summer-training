import { Document } from 'mongoose';
import { Products } from './products';
type Role = 'manger' | 'admin' | 'user';

type Address = {
    street: string;
    city: string;
    zipCode?: string;
    country: string;
};

export interface User extends Document {
    email: string;
    password: string;
    name: string;
    image: string;
    role: Role;
    active: boolean;
    passwordChangedAt: Date | number;
    PasswordResetCode: string;
    resetCode: string | undefined;
    resetCodeExpireTime: Date | number | undefined;
    resetCodeVerify: Boolean | undefined;
    wishlist: Products[];
    address: Address;
}
