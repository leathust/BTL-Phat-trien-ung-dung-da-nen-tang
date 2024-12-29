import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

// Hàm kiểm tra kết nối mạng
const checkNetworkConnection = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

// Đăng ký nhận thông báo
const requestUserPermission = async () => {
  const authorizationStatus = await messaging().requestPermission();
  if (authorizationStatus) {
    console.log('Notification permission granted');
  } else {
    console.log('Notification permission denied');
  }
};

// Nhận thông báo
const onNotificationReceived = (remoteMessage) => {
  console.log('Notification received:', remoteMessage.notification);
  Alert.alert('New Notification', remoteMessage.notification.body);
};

// Cấu hình nhận thông báo trong nền và khi ứng dụng được mở
const configureFCM = () => {
  messaging().onNotificationOpenedApp(onNotificationReceived);
  messaging().setBackgroundMessageHandler(onNotificationReceived);
};

// Lấy FCM Token
const getFCMToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log('FCM Token:', fcmToken);
    return fcmToken;
  }
  return null;
};

// Hàm để quản lý nhận thông báo và kiểm tra kết nối mạng
export const usePushNotification = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    // Kiểm tra kết nối mạng khi ứng dụng khởi động
    const checkConnection = async () => {
      const isNetworkConnected = await checkNetworkConnection();
      setIsConnected(isNetworkConnected);
    };

    // Đăng ký và nhận thông báo
    requestUserPermission();
    getFCMToken().then(setFcmToken);
    configureFCM();

    // Kiểm tra kết nối mạng khi kết nối thay đổi
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    // Kiểm tra kết nối mạng khi ứng dụng mở
    checkConnection();

    return () => {
      unsubscribe();
    };
  }, []);

  return { isConnected, fcmToken };
};
