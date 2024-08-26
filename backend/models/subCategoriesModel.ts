import { model, Schema } from 'mongoose';
import { SubCategories } from '../interfaces/subCategories';

const SubCategorySchema: Schema = new Schema<SubCategories>(
    {
        name: { type: String, required: true, unique: true, trim: true },
        category: { type: Schema.Types.ObjectId, required: true },
    },
    { timestamps: true }
);

export default model<SubCategories>('SubCategory', SubCategorySchema);
