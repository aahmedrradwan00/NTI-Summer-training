import { Document, Schema } from 'mongoose';

export interface SubCategories extends Document {
    name: string;
    category: Schema.Types.ObjectId;
}
