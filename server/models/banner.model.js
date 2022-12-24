import mongoose from 'mongoose';

const Banner = new mongoose.Schema(
    {
        id: { type: Number, require: true },
        image: { type: String, require: true },
        path: { type: String, require: true },
        name: { type: String, require: true },
        className: { type: String, require: true }
    },
    { timestamps: true }
);

export default mongoose.model('Banner', Banner);
