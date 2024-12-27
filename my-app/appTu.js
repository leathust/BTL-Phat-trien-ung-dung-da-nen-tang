import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const WonderFridgeApp = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Wonder Fridge</Text>
        <View style={styles.headerIcons}>
          <Text style={styles.icon}>🔍</Text>
          <Text style={styles.icon}>🛒</Text>
          <Text style={styles.icon}>⋮</Text>
        </View>
      </View>

      {/* Tab */}
      <View style={styles.tab}>
        <Text style={styles.tabText}>Tủ lạnh</Text>
        <Text style={styles.tabIcon}>❄️</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* <Image
          source={require('./fridge-icon.png')} // Replace with the actual image path
          style={styles.image}
        /> */}
        <Text style={styles.contentText}>
          Thức ăn của bạn đang chờ được cất giữ.
        </Text>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6200EA',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 20,
    marginHorizontal: 10,
  },
  tab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#7B1FA2',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabIcon: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#666666',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200EA',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default WonderFridgeApp;


//loginn
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Button,
//   ScrollView,
//   Modal,
//   Alert,
// } from "react-native";

// const App = () => {
//   const [isLogin, setIsLogin] = useState(false);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [forgotPasswordModalVisible, setForgotPasswordModalVisible] =
//     useState(false);
//   const [forgotEmail, setForgotEmail] = useState("");
//   const [forgotPhone, setForgotPhone] = useState("");
//   const [forgotSuccess, setForgotSuccess] = useState(false);

//   const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

//   const handleForgotPassword = () => {
//     if (!forgotEmail && !forgotPhone) {
//       Alert.alert("Lỗi", "Vui lòng nhập email hoặc số điện thoại!");
//       return;
//     }

//     setForgotSuccess(true); // Chuyển modal sang trạng thái xác nhận
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {!isLogin ? (
//         <View style={styles.formContainer}>
//           <Text style={styles.title}>Đăng Ký</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Tên người dùng"
//             value={username}
//             onChangeText={setUsername}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Số điện thoại"
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType="phone-pad"
//           />
//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Mật khẩu"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry={!passwordVisible}
//             />
//             <TouchableOpacity onPress={togglePasswordVisibility}>
//               <Text style={styles.toggleText}>
//                 {passwordVisible ? "Ẩn" : "Hiện"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <Button title="Đăng Ký" onPress={() => {}} />
//           <TouchableOpacity onPress={() => setIsLogin(true)}>
//             <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View style={styles.formContainer}>
//           <Text style={styles.title}>Đăng Nhập</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Số điện thoại"
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType="phone-pad"
//           />
//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Mật khẩu"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry={!passwordVisible}
//             />
//             <TouchableOpacity onPress={togglePasswordVisibility}>
//               <Text style={styles.toggleText}>
//                 {passwordVisible ? "Ẩn" : "Hiện"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <Button title="Đăng Nhập" onPress={() => {}} />
//           <TouchableOpacity
//             onPress={() => setForgotPasswordModalVisible(true)}
//           >
//             <Text style={styles.link}>Quên mật khẩu?</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setIsLogin(false)}>
//             <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Modal Quên mật khẩu */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={forgotPasswordModalVisible}
//         onRequestClose={() => {
//           setForgotPasswordModalVisible(false);
//           setForgotSuccess(false); // Reset trạng thái modal khi đóng
//         }}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             {!forgotSuccess ? (
//               <>
//                 <Text style={styles.modalTitle}>Quên Mật Khẩu</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Nhập email"
//                   value={forgotEmail}
//                   onChangeText={setForgotEmail}
//                   keyboardType="email-address"
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Nhập số điện thoại"
//                   value={forgotPhone}
//                   onChangeText={setForgotPhone}
//                   keyboardType="phone-pad"
//                 />
//                 <Button title="Gửi" onPress={handleForgotPassword} />
//                 <TouchableOpacity
//                   onPress={() => {
//                     setForgotPasswordModalVisible(false);
//                     setForgotSuccess(false); // Reset trạng thái modal
//                   }}
//                 >
//                   <Text style={styles.modalClose}>Hủy</Text>
//                 </TouchableOpacity>
//               </>
//             ) : (
//               <>
//                 <Text style={styles.modalTitle}>Bạn quên mật khẩu?</Text>
//                 <Text style={styles.modalMessage}>
//                   Xin chào{" "}
//                   {username
//                     ? `${username}`
//                     : "người dùng"}{" "}
//                   chúng tôi đã gửi mật khẩu mới tới địa chỉ{" "}
//                   {forgotEmail
//                     ? `email: ${forgotEmail}`
//                     : `số điện thoại: ${forgotPhone}`}{" "}
//                   của bạn!
//                 </Text>
//                 <Button
//                   title="Đóng"
//                   onPress={() => {
//                     setForgotPasswordModalVisible(false);
//                     setForgotSuccess(false); // Reset trạng thái modal
//                   }}
//                 />
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f4f4f4",
//     padding: 20,
//   },
//   formContainer: {
//     width: "100%",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//   },
//   passwordContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   toggleText: {
//     marginLeft: 10,
//     color: "#007BFF",
//   },
//   link: {
//     marginTop: 15,
//     color: "#007BFF",
//     textAlign: "center",
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContainer: {
//     width: "80%",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   modalMessage: {
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   modalClose: {
//     marginTop: 15,
//     color: "#FF0000",
//     textAlign: "center",
//   },
// });

// export default App;


 //-----REset pass----
//  import React, { useState } from "react";
//  import {
//    View,
//    Text,
//    TextInput,
//    TouchableOpacity,
//    StyleSheet,
//    Button,
//  } from "react-native";
 
//  const ResetPasswordView = () => {
//    const [email, setEmail] = useState("");
//    const [phone, setPhone] = useState("");
//    const [newPassword, setNewPassword] = useState("");
//    const [confirmPassword, setConfirmPassword] = useState("");
 
//    const handleResetPassword = () => {
//      if (!email && !phone) {
//        alert("Vui lòng nhập email hoặc số điện thoại!");
//        return;
//      }
 
//      if (newPassword !== confirmPassword) {
//        alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
//        return;
//      }
 
//      alert(
//        `Xin chào, chúng tôi đã gửi mật khẩu mới tới địa chỉ ${
//          email ? `email: ${email}` : `số điện thoại: ${phone}`
//        } của bạn!`
//      );
//    };
 
//    return (
//      <View style={styles.container}>
//        <View style={styles.resetContainer}>
//          <Text style={styles.title}>Reset Password</Text>
//          <TextInput
//            style={styles.input}
//            placeholder="Nhập email"
//            value={email}
//            onChangeText={setEmail}
//            keyboardType="email-address"
//          />
//          <TextInput
//            style={styles.input}
//            placeholder="Nhập số điện thoại"
//            value={phone}
//            onChangeText={setPhone}
//            keyboardType="phone-pad"
//          />
//          <TextInput
//            style={styles.input}
//            placeholder="Nhập mật khẩu mới"
//            value={newPassword}
//            onChangeText={setNewPassword}
//            secureTextEntry
//          />
//          <TextInput
//            style={styles.input}
//            placeholder="Xác nhận mật khẩu mới"
//            value={confirmPassword}
//            onChangeText={setConfirmPassword}
//            secureTextEntry
//          />
//          <Button title="Submit" onPress={handleResetPassword} />
//          <TouchableOpacity>
//            <Text style={styles.link}>Quay lại</Text>
//          </TouchableOpacity>
//        </View>
//      </View>
//    );
//  };
 
//  const styles = StyleSheet.create({
//    container: {
//      flex: 1,
//      justifyContent: "center", // Căn giữa theo chiều dọc
//      alignItems: "center", // Căn giữa theo chiều ngang
//      backgroundColor: "#f4f4f4",
//      padding: 20,
//    },
//    resetContainer: {
//      width: "80%", // Tạo độ rộng cho form
//      backgroundColor: "#fff",
//      borderRadius: 10,
//      padding: 20,
//      shadowColor: "#000",
//      shadowOffset: { width: 0, height: 10 },
//      shadowOpacity: 0.1,
//      shadowRadius: 10,
//      elevation: 5,
//    },
//    title: {
//      fontSize: 24,
//      fontWeight: "bold",
//      marginBottom: 20,
//      textAlign: "center",
//    },
//    input: {
//      borderWidth: 1,
//      borderColor: "#ccc",
//      borderRadius: 5,
//      padding: 10,
//      marginBottom: 15,
//    },
//    link: {
//      marginTop: 15,
//      color: "#007BFF",
//      textAlign: "center",
//    },
//  });
 
//  export default ResetPasswordView;
 


