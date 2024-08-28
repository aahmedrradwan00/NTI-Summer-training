import { model, Schema } from 'mongoose';
import { User } from '../interfaces/user';
import bcrypt from 'bcryptjs';

const userSchema: Schema = new Schema<User>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlength: 6, maxlength: 20 },
        image: String,
        role: { type: String, required: true, enum: ['manager', 'admin', 'user'] },
        active: { type: Boolean, default: true },
        passwordChangedAt: Date,
        resetCode: String,
        resetCodeExpireTime: Date,
        resetCodeVerify: Boolean,
    },
    { timestamps: true }
);
const imageUrl = (document: User) => {
    if (document.image) {
        const imageUrl: string = `${process.env.BASE_URL}/users/${document.image}`;
        document.image = imageUrl;
    }
};
userSchema.post<User>('init', (document: User) => imageUrl(document));

userSchema.pre<User>('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

export default model<User>('User', userSchema);
