import mongoose from "mongoose";

// Định nghĩa Schema
const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: [true, "Group name is required"],
    trim: true,
    minlength: [2, "Group name must be at least 2 characters long"],
    maxlength: [100, "Group name cannot exceed 100 characters"],
  },
  groupDescription: {
    type: String,
    required: [true, "Group description is required"],
    trim: true,
    minlength: [2, "Group description must be at least 2 characters long"],
    maxlength: [500, "Group description cannot exceed 500 characters"],
  },
  groupAvatar: {
    type: String,
    required: false,
    trim: true,
    default: "default-group-avatar.png",
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Tham chiếu tới User model
    required: [true, "Admin is required"],
  },
  groupMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Tham chiếu đến User model
    },
  ],
  sharedLists: {
    type: [mongoose.Schema.Types.ObjectId], // Lưu danh sách các listId đã được chia sẻ với nhóm
    default: [],
    ref: "List",
  },
}, { timestamps: true });

// Export model
const Group = mongoose.model("Group", groupSchema);

export default Group;


