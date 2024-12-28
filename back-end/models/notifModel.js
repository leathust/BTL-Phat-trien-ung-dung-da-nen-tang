import mongoose from 'mongoose';

const notifSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,   
        required: true,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notifSchema);

export default Notification;