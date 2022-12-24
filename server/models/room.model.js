import mongoose, { Schema } from 'mongoose';
const ObjectIdType = Schema.Types.ObjectId;

const Room = new mongoose.Schema(
    {
        number: { type: Number },
        type: { type: ObjectIdType, ref: 'RoomType' },
        name: { type: String },
        title: { type: String },
        priceList: { type: Object },
        properties: [{ name: { type: String }, icon: { type: ObjectIdType, ref: 'Icon' }, value: { type: String } }],
        amenities: [{ type: ObjectIdType, ref: 'Icon' }],
        otherAmenities: [{ type: String }],
        description: { type: String },
        area: { type: Number },
        countOfRooms: { type: Number },
        maxNumberOfPersons: { type: Number },
        booking: [{ bookingId: { type: ObjectIdType, ref: 'Booking' }, bookingRange: [{ type: Date }] }],
        image: { type: String },
        className: { type: String }
    },
    { timestamps: true }
);

export default mongoose.model('Room', Room);
