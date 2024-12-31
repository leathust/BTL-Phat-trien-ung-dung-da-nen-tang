import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

// Lưu trữ accessToken, refreshToken và thời gian hết hạn
export const storeTokens = async (accessToken, refreshToken, expiryTime) => {
  try {
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    await SecureStore.setItemAsync('accessTokenExpiry', expiryTime.toString());
  } catch (error) {
    console.error('Error storing tokens', error);
  }
};

// Lấy accessToken từ SecureStore và kiểm tra hết hạn
export const getAccessToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    const expiryTime = await SecureStore.getItemAsync('accessTokenExpiry');
    const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (second)

    // Kiểm tra nếu access token đã hết hạn
    if (expiryTime && currentTime >= parseInt(expiryTime)) {
      return null; // Token đã hết hạn
    }

    return token;
  } catch (error) {
    console.error('Error retrieving access token', error);
  }
};

// Hàm làm mới access token khi hết hạn
export const refreshAccessToken = async () => {
  try {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token available.');
    }

    // Gửi refresh token tới backend để lấy access token mới
    const response = await axios.post('http://localhost:3000/api/v1/user/refresh-token', {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`, // Gửi refresh token trong header
      }
    });

    if (response.data.accessToken) {
      const newAccessToken = response.data.accessToken;
      const newExpiryTime = response.data.expiryTime; // Thời gian hết hạn mới từ backend
      await storeTokens(newAccessToken, refreshToken, newExpiryTime);
      return newAccessToken;
    } else {
      throw new Error('Failed to refresh access token.');
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

// Gửi request với access token hợp lệ (hoặc làm mới token nếu cần)
export const sendAuthenticatedRequest = async (url, method = 'GET', data = null) => {
  try {
    let accessToken = await getAccessToken();

    // Nếu access token đã hết hạn, làm mới token
    if (!accessToken) {
      accessToken = await refreshAccessToken();
      if (!accessToken) {
        throw new Error('Unable to get valid access token.');
      }
    }

    // Gửi request với access token mới
    const response = await axios({
      url,
      method,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`, // Gửi access token trong header
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error in sending authenticated request:', error);
  }
};

// Xử lý đăng xuất (logout)
export const logout = async () => {
  try {
    // Xóa access token, refresh token và thời gian hết hạn khỏi SecureStore
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('accessTokenExpiry');
    
    console.log('Logout successful.');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
