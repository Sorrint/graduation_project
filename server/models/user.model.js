import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        username: { type: String },
        email: { type: String, unique: true, require: true },
        password: { type: String, require: true },
        sex: { type: String, enum: ['male', 'female'] },
        avatar: { type: String },
        roles: [{ type: String, ref: 'Role' }]
    },
    { timestamps: true }
);

export default mongoose.model('User', User);
