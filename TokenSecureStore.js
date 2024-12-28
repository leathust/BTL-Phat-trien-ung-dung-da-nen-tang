import * as SecureStore from 'expo-secure-store';

const storeTokens = async (accessToken, refreshToken) => {
  try {
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
  } catch (error) {
    console.error('Error storing tokens', error);
  }
};

// Lấy token từ API response và gọi hàm lưu trữ
const handleLoginResponse = (response) => {
  const { accessToken, refreshToken } = response.data;
  storeTokens(accessToken, refreshToken);
};
