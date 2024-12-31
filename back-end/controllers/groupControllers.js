import Group from "../models/groupModel.js";
import User from "../models/userModel.js";
import { sendPushNotification } from '../services/notifServices.js';
import Invitation from '../models/invitationModel.js';
import Notification from '../models/notifModel.js';
import Task from "../models/taskModel.js";

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

//SEND INVITATION TO JOIN A GROUP
export const sendInvitation = async (req, res) => {
  try {
    const { groupID, userID } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!groupID || !userID) {
      return res.status(400).json({ message: 'Group ID and User ID are required.' });
    }

    // Kiểm tra sự tồn tại của nhóm và người dùng
    const group = await Group.findOne({ groupId: groupID });
    if (!group) return res.status(404).json({ message: 'Group not found.' });

    const user = await User.findOne({ userId: userID });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Kiểm tra người dùng đã là thành viên chưa
    if (group.groupMembers.includes(userID)) {
      return res.status(400).json({ message: 'User is already a member of the group.' });
    }

    // Tạo lời mời và lưu vào DB
    const invitation = new Invitation({
      groupID,
      userID,
      status: 'pending',
    });
    await invitation.save();

    // Tạo thông báo trong hệ thống
    const notification = new Notification({
      userID,
      message: `You have been invited to join the group ${group.groupName}.`,
      type: 'invitation',
      data: { groupID, invitationID: invitation._id },
      status: 'pending', // Lưu thông báo với trạng thái pending
    });
    await notification.save();

    // Gửi thông báo đẩy qua FCM
    if (user.fcmToken) {
      try {
        await sendPushNotification(
          user.fcmToken,
          'Group Invitation',
          `You have been invited to join the group ${group.groupName}.`,
          { groupID: groupID, invitationID: invitation._id }
        );

        // Nếu gửi thành công, cập nhật trạng thái thông báo thành 'sent'
        await Notification.updateOne(
          { _id: notification._id },
          { status: 'sent' }
        );
      } catch (error) {
        // Nếu gửi không thành công, không thay đổi trạng thái
        console.error('Error sending push notification:', error.message);
      }
    }

    return res.status(200).json({
      message: `Invitation sent to user ${userID} for group ${groupID} successfully.`,
    });
  } catch (error) {
    console.error('Error in sending invitation:', error.message);
    return res.status(500).json({
      message: 'An error occurred while sending the invitation.',
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

    // Kiểm tra lời mời có tồn tại không
    const invitation = await Invitation.findOne({ _id: invitationID, userId: userID, groupId: groupID });
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found." });
    }

    // Kiểm tra nếu người dùng đã là thành viên
    if (group.groupMembers.includes(userID)) {
      return res.status(400).json({ message: "User is already a member of the group." });
    }

    // Thêm người dùng vào danh sách thành viên của nhóm
    group.groupMembers.push(userID);
    await group.save();

    // Cập nhật trạng thái lời mời
    invitation.status = 'accepted';
    await invitation.save();

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

// ASSIGN MEMBER TO PURCHASE ITEMS
export const assignTask = async (req, res) => {
  try {
    const { groupID, memberID, items } = req.body;
    const adminID = req.user.userId; // Lấy adminID từ token sau khi xác thực

    // Kiểm tra đầu vào
    if (!groupID || !memberID || !items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Group ID, Member ID, and items are required, and items should be an array." });
    }

    // Kiểm tra nhóm có tồn tại không
    const group = await Group.findOne({ groupId: groupID });
    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    // Kiểm tra quyền admin
    if (group.admin !== adminID) {
      return res.status(403).json({ message: "Only the admin can assign members to purchase items." });
    }

    // Kiểm tra xem người dùng có phải là thành viên của nhóm không
    if (!group.groupMembers.includes(memberID)) {
      return res.status(400).json({ message: "User is not a member of the group." });
    }

    // Thêm nhiệm vụ mua hàng vào danh sách nhiệm vụ hàng ngày của thành viên
    const member = await User.findOne({ userId: memberID });
    if (!member) {
      return res.status(404).json({ message: "User not found." });
    }

    // // Định dạng ngày tháng năm
    // const dateToBuy = new Date().toLocaleDateString('en-GB'); // Định dạng ngày tháng năm theo định dạng dd/mm/yyyy
    // member.dailyTask.push({ groupID, items, dateToBuy });
    // await member.save();

    // Tạo task mới
    const task = new Task.create({
      groupId: groupID,
      userId: memberID,
      items,
    });
    await task.save();

    return res.status(200).json({
      message: `Member ${memberID} has been assigned to purchase items successfully.`,
      tasks: task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while assigning member to purchase items.",
      error: error.message,
    });
  }
};


