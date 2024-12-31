import admin from 'firebase-admin';
import Notification from '../models/notifModel.js';

// Hàm gửi thông báo đẩy
export const sendPushNotification = async (fcmToken, title, body, data = {}) => {
  try {
    // Chuẩn bị nội dung thông báo
    const message = {
      token: fcmToken,
      notification: {
        title,
        body,
      },
      data, // Dữ liệu thêm (key-value) để xử lý tại client
    };

    // Gửi thông báo qua FCM
    await admin.messaging().send(message);
    console.log(`Notification sent successfully to ${fcmToken}`);
  } catch (error) {
    console.error('Error sending FCM notification:', error.message);
    throw error; // Quăng lỗi để xử lý tại controller
  }
};

//Hàm gửi lại thông báo đẩy
export const resendPendingNotifications = async () => {
  try {
    const pendingNotifications = await Notification.find({ status: 'pending' });

    const sendPromises = pendingNotifications.map(async (notification) => {
      const user = await User.findById(notification.userID);
      
      if (user && user.fcmToken) {
        try {
          await sendPushNotification(
            user.fcmToken,
            notification.type,
            notification.message,
            notification.data
          );
          
          // Cập nhật trạng thái thông báo thành 'sent'
          await Notification.updateOne(
            { _id: notification._id },
            { status: 'sent' }
          );
        } catch (error) {
          console.error('Error resending notification:', error.message);
        }
      }
    });

    // Xử lý tất cả các lời gọi đồng thời
    await Promise.allSettled(sendPromises);

  } catch (error) {
    console.error('Error in processing pending notifications:', error.message);
  }
};

  
