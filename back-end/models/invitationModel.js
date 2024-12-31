import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema({ 
    groupId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    }
}, { timestamps: true });

const Invitation = mongoose.model("Invitation", invitationSchema);

export default Invitation;