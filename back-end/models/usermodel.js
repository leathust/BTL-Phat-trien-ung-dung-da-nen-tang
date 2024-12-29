import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// Định nghĩa Schema
const userSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: [true, "The name is required"],
      trim: true,
      maxlength: [40, "The maxlength is 40"],
      minlength: [2, "The minlength is 2"],
      validate: {
        validator: function (value) {
          return /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơưĂÂÊÔƠƯ\s]+$/.test(value);
        },
        message: "The user name must contain only letters, spaces, and valid Vietnamese characters"
      },
    },    
    password: {
      type: String,
      required: [true, "The password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phoneNumber: {
      type: String,
      unique: true,
      trim: true,
      validate: {
        validator: (phone) => /^\+?[0-9]\d{9,14}$/.test(phone),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    avatarImage: {
      type: String,
      default: "default-image.png",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: false,
    },
    // dailyTask: {
    //   type: [Object],
    //   default: [],
    // },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
}, { timestamps: true });

// Mã hóa mật khẩu trước khi lưu
userSchema.pre("save", async function (next) {
  // Chỉ mã hóa nếu mật khẩu được thay đổi
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 12); // Mã hóa mật khẩu
    next();
  } catch (error) {
    return next(error);
  }
});

// Phương thức kiểm tra email hoặc số điện thoại đã tồn tại
userSchema.statics.isUserExists = async function (email, phoneNumber) {
  const existingUser = await this.findOne({
    $or: [{ email }, { phoneNumber }],
  });
  return existingUser;
};

// Phương thức kiểm tra mật khẩu
userSchema.methods.isPasswordCorrect = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// Export model
const User = mongoose.model("User", userSchema);

export default User;
