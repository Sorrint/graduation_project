import mongoose, { Schema } from 'mongoose';
const ObjectIdType = Schema.Types.ObjectId;

const Token = new mongoose.Schema(
    {
        user: { type: ObjectIdType, ref: 'User' },
        refreshToken: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model('Token', Token);
