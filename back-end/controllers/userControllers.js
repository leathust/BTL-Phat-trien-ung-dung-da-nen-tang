import { createAccessToken, createRefreshToken } from '../services/tokenServices.js';
import User from "./../models/userModel.js";
import nodemailer from 'nodemailer';

// REGISTER
export const userRegister = async (req, res) => {
  try {
    const { userName, password, email, phoneNumber } = req.body;

    // Kiểm tra thông tin cần thiết
    if (!userName || !password || !email) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Kiểm tra email hoặc số điện thoại đã tồn tại
    const existingUser = await User.isUserExists(email, phoneNumber);
    if (existingUser) {
      return res.status(400).json({ message: "Email or phone number already in use." });
    }

    // Tạo người dùng mới (model tự xử lý các logic như mã hóa mật khẩu)
    const newUser = await User.create({
      userName,
      password,
      email,
      phoneNumber,
    });

    // Trả về phản hồi thành công
    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        userId: newUser.userId,
        userName: newUser.userName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Error in userRegister:", error.message);

    // Xử lý lỗi và trả phản hồi cho client
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// LOGIN
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra xem email và password đã được cung cấp chưa
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password must be provided." });
    }

    // Kiểm tra người dùng có tồn tại hay không
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Kiểm tra mật khẩu đúng hay không
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Tạo Access Token và Refresh Token
    const accessToken = createAccessToken({ userId: user.userId, email: user.email });
    const refreshToken = createRefreshToken({ userId: user.userId });

    // Trả về Access Token và Refresh Token trong response body
    return res.status(200).json({
      message: "Login successful!",
      accessToken,
      refreshToken,  // Trả về refresh token thay vì lưu trong cookie
    });
  } catch (error) {
    console.error("Error in userLogin:", error.message);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// LOGOUT
export const userLogout = async (req, res) => {
  try {
    // Xóa cookie refreshToken
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // chỉ dùng trong HTTPS
      sameSite: "Strict",
    });

    // Trả về phản hồi thành công
    return res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    console.error("Error in userLogout:", error.message);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// REFRESH TOKEN
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken; // Lấy refresh token từ cookie

    // Kiểm tra xem refresh token có tồn tại không
    if (!refreshToken) {
      return res.status(404).json({ message: "Refresh token not found." });
    }

    // Xác thực refresh token và lấy thông tin người dùng
    const decoded = verifyRefreshToken(refreshToken);

    // Tạo Access Token mới
    const accessToken = createAccessToken({ userId: decoded.userId, email: decoded.email });

    // Trả về Access Token mới trong phản hồi
    return res.status(200).json({
      message: "Access token refreshed successfully.",
      accessToken,
    });
  } catch (error) {
    console.error("Error in refreshToken:", error.message);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// GET VERIFICATION CODE
export const getVerificationCode =  async (req, res) => {
  const { email } = req.body;

  // Kiểm tra xem email có được cung cấp hay không
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Tạo mã xác minh (6 chữ số ngẫu nhiên)
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Cấu hình transporter cho Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Bạn có thể thay bằng dịch vụ khác như Outlook, Yahoo
    auth: {
      user: process.env.EMAIL || 'your email here', // Email của bạn
      pass: process.env.EMAIL_APP_PASSWORD || 'your app password', // Mật khẩu ứng dụng
    },
  });

  // Cấu hình nội dung email
  const mailOptions = {
    from: process.env.EMAIL || 'your email here',
    to: email,
    subject: 'Verification Code',
    text: `Your verification code is: ${verificationCode}`,
  };

  try {
    // Gửi email
    await transporter.sendMail(mailOptions);

    // Phản hồi thành công
    res.status(200).json({ message: 'Verification code sent successfully', verificationCode });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send verification code' });
  }
};

// VERIFY EMAIL
export const verifyEmail = async (req, res) => {
  try {
    const { code, token } = req.body;

    // Kiểm tra nếu mã xác minh hoặc token không được cung cấp
    if (!code || !token) {
      return res.status(400).json({ message: "Verification code and token are required." });
    }

    // Xác thực token
    let decoded;
    try {
      decoded = verifyAccessToken(token); // Sử dụng hàm verifyAccessToken từ tokenService
    } catch (error) {
      return res.status(5003).json({ message: "Token Denied" });
    }

    // Tìm người dùng dựa trên thông tin từ token
    const user = await User.findOne({ userId: decoded.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Kiểm tra nếu người dùng đã được xác minh
    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified." });
    }

    // So sánh mã xác minh (ở đây, bạn cần tự lưu mã xác minh vào cơ sở dữ liệu hoặc bộ nhớ tạm)
    if (user.verificationCode !== code) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    // Cập nhật trạng thái xác minh của người dùng
    user.isVerified = true;
    await user.save();

    // Trả về phản hồi thành công
    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    console.error("Error in verifyEmail:", error.message);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// FIND USER BY NAME
export const findUserByName = async (req, res) => {
  try {
    const { name } = req.body;

    // Kiểm tra xem tên có được cung cấp hay không
    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }

    // Tìm người dùng dựa trên tên
    const user = await User.findOne({ userName: { $regex: name, $options: "i" } }); // Tìm kiếm không phân biệt hoa thường

    // Nếu không tìm thấy người dùng
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Trả về thông tin người dùng
    return res.status(200).json({
      message: "User found successfully.",
      user: {
        userId: user.userId,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isVerified: user.isVerified,
        avatarImage: user.avatarImage,
      },
    });
  } catch (error) {
    console.error("Error in findUserByName:", error.message);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// FIND USER BY ID
export const findUserById = async (req, res) => {
  try {
    const { id } = req.body;

    // Kiểm tra xem id có được cung cấp hay không
    if (!id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Tìm người dùng theo userId
    const user = await User.findOne({ userId: id });

    // Nếu không tìm thấy người dùng
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Trả về thông tin người dùng
    return res.status(200).json({
      message: "User found successfully.",
      user: {
        userId: user.userId,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isVerified: user.isVerified,
        avatarImage: user.avatarImage,
      },
    });
  } catch (error) {
    console.error("Error in findUserById:", error.message);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

import bcrypt from 'bcrypt';

// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.user; // Lấy userId từ token đã xác thực

    // Kiểm tra thông tin cần thiết
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both old password and new password are required." });
    }

    // Kiểm tra độ dài của mật khẩu mới
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters long." });
    }

    // Tìm người dùng theo userId
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Kiểm tra mật khẩu cũ
    const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isOldPasswordCorrect) {
      return res.status(5006).json({ message: "Wrong Password" });
    }

    // Mã hóa mật khẩu mới và lưu vào cơ sở dữ liệu
    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    // Trả về phản hồi thành công
    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error in changePassword:", error.message);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// UPDATE PERSONAL INFO
export const updatePersonalInfo = async (req, res) => {
  try {
    const { id, username, email, phoneNumber, introduction } = req.body;

    // Kiểm tra xem tất cả các trường thông tin có được cung cấp không
    if (!id || !username || !email || !phoneNumber) {
      return res.status(400).json({ message: "All fields (id, username, email, phoneNumber) are required." });
    }

    // Tìm và cập nhật người dùng theo ID
    const user = await User.findOneAndUpdate(
      { userId: id },
      { userName: username, email, phoneNumber, introduction },
      { new: true, runValidators: true } // Trả về tài liệu sau khi cập nhật và kiểm tra validate
    );

    // Nếu không tìm thấy người dùng
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Trả về phản hồi thành công với thông tin người dùng đã cập nhật
    return res.status(200).json({
      message: "User info updated successfully.",
      user: {
        userId: user.userId,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        introduction: user.introduction || "",
      },
    });
  } catch (error) {
    console.error("Error in updatePersonalInfo:", error.message);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};
