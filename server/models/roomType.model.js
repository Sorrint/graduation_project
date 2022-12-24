import mongoose from 'mongoose';

const RoomType = new mongoose.Schema(
    {
        name: { type: String },
        value: { type: String }
    },
    { timestamps: true }
);

export default mongoose.model('RoomType', RoomType);
