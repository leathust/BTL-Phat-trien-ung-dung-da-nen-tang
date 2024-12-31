import cron from 'node-cron';
import { resendPendingNotifications } from './services/notifServices.js'; // Đảm bảo import đúng vị trí của hàm resendPendingNotifications

// Định kỳ quét và gửi thông báo mỗi 10 phút
cron.schedule('*/10 * * * *', async () => {
  console.log('Starting to resend pending notifications...');
  await resendPendingNotifications();
  console.log('Finished resending pending notifications.');
});
