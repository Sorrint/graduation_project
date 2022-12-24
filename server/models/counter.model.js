import mongoose, { Schema } from 'mongoose';

const Counter = new mongoose.Schema({
    name: { type: String },
    value: { type: Number }
});

export default mongoose.model('Counter', Counter);
