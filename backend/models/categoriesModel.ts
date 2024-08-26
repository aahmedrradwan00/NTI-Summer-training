import { model, Schema } from 'mongoose';
import { Categories } from '../interfaces/categories';

const categoriesSchema: Schema = new Schema<Categories>(
    {
        name: { type: String, required: true, unique: true, trim: true },
    },
    { timestamps: true }
);

export default model<Categories>('Category', categoriesSchema);
