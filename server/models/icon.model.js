import mongoose from 'mongoose';

const Icon = new mongoose.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    text: { type: String }
});

export default mongoose.model('Icon', Icon);
