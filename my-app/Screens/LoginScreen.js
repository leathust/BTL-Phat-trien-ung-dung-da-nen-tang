import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig.extra.API_URL;

const LoginScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] =
    useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotPhone, setForgotPhone] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Đăng nhập thành công!", "Nhóm 18");
        navigation.navigate("Home");
      } else {
        Alert.alert("Lỗi", data.message || "Sai tài khoản hoặc mật khẩu!");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  const handleRegister = async () => {
    if (!username || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, phone, password }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Thành công", "Đăng ký thành công!");
        setIsLogin(true);
      } else {
        Alert.alert("Lỗi", data.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!isLogin ? (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Đăng Ký</Text>
          <TextInput
            style={styles.input}
            placeholder="Tên người dùng"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Ionicons
                name={passwordVisible ? "eye-off" : "eye"}
                size={24}
                color="#007BFF"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!confirmPasswordVisible}
            />
            <TouchableOpacity
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              <Ionicons
                name={confirmPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color="#007BFF"
              />
            </TouchableOpacity>
          </View>
          <Button
            title="Đăng Ký"
            onPress={handleRegister}
          />
          <TouchableOpacity onPress={() => setIsLogin(true)}>
            <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Đăng Nhập</Text>
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Ionicons
                name={passwordVisible ? "eye-off" : "eye"}
                size={24}
                color="#007BFF"
              />
            </TouchableOpacity>
          </View>
          <Button title="Đăng Nhập" onPress={handleLogin} />
          <TouchableOpacity
            onPress={() => setForgotPasswordModalVisible(true)}
          >
            <Text style={styles.link}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsLogin(false)}>
            <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  formContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
});

export default LoginScreen;
