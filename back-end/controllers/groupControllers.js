import Group from "../models/groupModel.js";
import User from "../models/userModel.js";

// CREATE A NEW GROUP
export const createGroup = async (req, res) => {
  try {
    const { groupName, groupDescription, groupAvatar } = req.body;
    const adminId = req.user.userId; // Lấy admin từ token (middleware đã xác thực)

    // Tạo nhóm mới
    const newGroup = await Group.create({
      groupName,
      groupDescription,
      groupAvatar,
      admin: adminId,
      groupMembers: [adminId], // Admin cũng là thành viên nhóm
    });

    res.status(201).json({
      message: "Group created successfully",
      group: newGroup,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating group",
      error: error.message,
    });
  }
};

// DELETE A GROUP
export const deleteGroup = async (req, res) => {
  try {
    const { groupID } = req.body;

    // Kiểm tra đầu vào
    if (!groupID) {
      return res.status(400).json({ message: "Group ID is required." });
    }

    // Tìm và xóa nhóm
    const deletedGroup = await Group.findOneAndDelete({ groupId: groupID });

    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found." });
    }

    return res.status(200).json({
      message: "Group deleted successfully.",
      group: deletedGroup,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while deleting the group.",
      error: error.message,
    });
  }
};

// GET A GROUP INFORMATION
export const getGroupInfo = async (req, res) => {
  try {
    const { groupID } = req.query;

    // Kiểm tra đầu vào
    if (!groupID) {
      return res.status(400).json({ message: "Group ID is required." });
    }

    // Tìm nhóm theo groupID
    const group = await Group.findOne({ groupId: groupID }).populate("groupMembers", "userName email phoneNumber");

    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    return res.status(200).json({
      message: "Group information retrieved successfully.",
      group,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while retrieving group information.",
      error: error.message,
    });
  }
};



// SEND INVITATION TO JOIN A GROUP
export const sendInvitation = async (req, res) => {
  try {
    const { groupID, userID } = req.body;

    // Kiểm tra đầu vào
    if (!groupID || !userID) {
      return res.status(400).json({ message: "Group ID and User ID are required." });
    }

    // Kiểm tra xem nhóm có tồn tại không
    const group = await Group.findOne({ groupId: groupID });
    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findOne({ userId: userID });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Kiểm tra xem người dùng đã là thành viên của nhóm chưa
    if (group.groupMembers.includes(userID)) {
      return res.status(400).json({ message: "User is already a member of the group." });
    }

    // Xử lý logic gửi lời mời (ví dụ: lưu trạng thái lời mời hoặc gửi thông báo)
    // Đối với ví dụ này, ta chỉ trả về thông báo thành công
    return res.status(200).json({
      message: `Invitation sent to user ${userID} for group ${groupID} successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while sending the invitation.",
      error: error.message,
    });
  }
};

// ACCEPT INVITATION TO JOIN A GROUP
export const acceptInvitation = async (req, res) => {
  try {
    const { groupID } = req.body;
    const userID = req.user.userId; // Lấy userID từ token sau khi xác thực

    // Kiểm tra đầu vào
    if (!groupID) {
      return res.status(400).json({ message: "Group ID is required." });
    }

    // Kiểm tra nhóm có tồn tại không
    const group = await Group.findOne({ groupId: groupID });
    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    // Kiểm tra nếu người dùng đã là thành viên
    if (group.groupMembers.includes(userID)) {
      return res.status(400).json({ message: "User is already a member of the group." });
    }

    // Thêm người dùng vào danh sách thành viên của nhóm
    group.groupMembers.push(userID);
    await group.save();

    return res.status(200).json({
      message: `User ${userID} has successfully joined group ${groupID}.`,
      group,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while accepting the invitation.",
      error: error.message,
    });
  }
};

// DELETE A MEMBER FROM A GROUP
export const removeMember = async (req, res) => {
  try {
    const { groupID, memberID } = req.body;
    const userID = req.user.userId; // Lấy userID từ token sau khi xác thực

    // Kiểm tra đầu vào
    if (!groupID || !memberID) {
      return res.status(400).json({ message: "Group ID and Member ID are required." });
    }

    // Kiểm tra nhóm có tồn tại không
    const group = await Group.findOne({ groupId: groupID });
    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    // Kiểm tra quyền admin
    if (group.adminId !== userID) {
      return res.status(403).json({ message: "Only the admin can remove members from the group." });
    }

    // Loại bỏ thành viên khỏi nhóm
    const membersToRemove = Array.isArray(memberID) ? memberID : [memberID]; // Chuyển thành mảng nếu memberID là số
    group.groupMembers = group.groupMembers.filter((member) => !membersToRemove.includes(member));

    // Lưu thay đổi vào cơ sở dữ liệu
    await group.save();

    return res.status(200).json({
      message: `Members successfully removed from group ${groupID}.`,
      updatedGroup: group,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while removing members.",
      error: error.message,
    });
  }
};

import Group from "../models/groupModel.js";

// A MEMBER LEAVES A GROUP
export const leaveGroup = async (req, res) => {
  try {
    const { groupID, userID } = req.body;
    const currentUserId = req.user.userId; // Lấy userID từ token sau khi xác thực

    // Kiểm tra đầu vào
    if (!groupID || !userID) {
      return res.status(400).json({ message: "Group ID and User ID are required." });
    }

    // Kiểm tra nhóm có tồn tại không
    const group = await Group.findOne({ groupId: groupID });
    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    // Kiểm tra nếu user muốn rời nhóm không phải chính họ
    if (currentUserId !== userID) {
      return res.status(403).json({ message: "You can only remove yourself from the group." });
    }

    // Nếu người dùng là admin, không được rời nhóm
    if (group.adminId === userID) {
      return res.status(403).json({
        message: "Admin cannot leave the group. Please transfer admin rights before leaving.",
      });
    }

    // Loại bỏ người dùng khỏi nhóm
    group.groupMembers = group.groupMembers.filter((member) => member !== userID);

    // Lưu thay đổi vào cơ sở dữ liệu
    await group.save();

    return res.status(200).json({
      message: `User ${userID} has successfully left the group ${groupID}.`,
      updatedGroup: group,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while leaving the group.",
      error: error.message,
    });
  }
};

// SHARE A LIST WITH A GROUP
export const shareListWithGroup = async (req, res) => {
  try {
    const { listID, groupID } = req.body;

    // Kiểm tra đầu vào
    if (!listID || !groupID) {
      return res.status(400).json({ message: "List ID and Group ID are required." });
    }

    // Kiểm tra nhóm có tồn tại không
    const group = await Group.findOne({ groupId: groupID });
    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    // Kiểm tra danh sách có tồn tại không
    const list = await List.findOne({ listId: listID });
    if (!list) {
      return res.status(404).json({ message: "List not found." });
    }

    // Kiểm tra xem danh sách này đã được chia sẻ với nhóm chưa
    if (group.sharedLists && group.sharedLists.includes(listID)) {
      return res.status(400).json({ message: "List already shared with this group." });
    }

    // Chia sẻ danh sách với nhóm
    if (!group.sharedLists) group.sharedLists = []; // Khởi tạo mảng nếu chưa có
    group.sharedLists.push(listID);

    // Lưu thay đổi vào cơ sở dữ liệu
    await group.save();

    return res.status(200).json({
      message: `List ${listID} has been successfully shared with group ${groupID}.`,
      updatedGroup: group,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while sharing the list with the group.",
      error: error.message,
    });
  }
};


