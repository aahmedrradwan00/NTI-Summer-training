import { Document } from 'mongoose';
import { User } from './user';
import { Products } from './products';


export interface Reviews extends Document {
    comment: string;
    rating: number;
    user: User;
    product: Products;
}
