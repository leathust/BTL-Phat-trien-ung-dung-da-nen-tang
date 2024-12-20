import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [phonenumbers, setPhonenumbers] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    if (phonenumbers === '' || password === '') {
      Alert.alert('Hãy nhập đủ số điện thoại và mật khẩu của tài khoản');
      return;
    }

    // Simulate authentication (you can replace this with real authentication logic)
    if (phonenumbers === '0000' && password === 'password') {
      Alert.alert('Đăng nhập thành công', 'Chào mừng Nhóm 18', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
    } else {
      Alert.alert('Đăng nhập thất bại', 'Số điện thoại hoặc mật khẩu không hợp lệ!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        keyboardType='phone-pad'
        value={phonenumbers}
        onChangeText={setPhonenumbers}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIconContainer}
        >
          <Icon
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>
      <Button title="Đăng nhập" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 5,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: 'gray',
  },
  link: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  eyeIconContainer: {
    position: 'absolute', // Position the icon above and at the end of the input
    right: 10, // Place at the end of the TextInput (right)
    top: 8,  // Place it above the TextInput (adjust for your design)
  },
  passwordContainer: {
    position: 'relative', // Parent container of TextInput and Icon
    width: '100%',
    marginBottom: 20,
  },
});

export default LoginScreen;