import mongoose, { Schema } from 'mongoose';

const ObjectIdType = Schema.Types.ObjectId;
const Review = new mongoose.Schema(
    {
        user: { type: ObjectIdType, ref: 'User' },
        content: { type: String }
    },
    { timestamps: true }
);

export default mongoose.model('Review', Review);
