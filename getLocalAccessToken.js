const getAccessToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('accessToken');
      return token;
    } catch (error) {
      console.error('Error retrieving access token', error);
    }
  };
  