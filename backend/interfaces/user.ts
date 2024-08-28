import { Document } from 'mongoose';
type Role = 'manger' | 'admin' | 'user';
export interface User extends Document {
    email: string;
    password: string;
    name: string;
    image: string;
    role: Role;
    active: boolean;
    passwordChangedAt: Date | number;
    PasswordResetCode: string;
    resetCode: string;
    resetCodeExpireTime: Date | number;
    resetCodeVerify: Boolean;
}
