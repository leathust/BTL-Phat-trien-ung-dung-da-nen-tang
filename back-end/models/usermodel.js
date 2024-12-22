import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

// Định nghĩa Schema
const userSchema = new mongoose.Schema({
    userId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    userName: {
      type: String,
      required: [true, "The name is required"],
      trim: true,
      maxlength: [40, "The maxlength is 40"],
      minlength: [2, "The minlength is 2"],
      validate: {
        validator: function (value) {
          return /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂÊÔƠƯ\s]+$/.test(value);
        },
        message: "The user name must contain only letters, spaces, and valid Vietnamese characters",
      },
    },    
    password: {
      type: String,
      required: [true, "The password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    passwordConfirm: {  //Trường này sẽ KHÔNG được lưu vào cơ sở dữ liệu
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        // Custom validator để kiểm tra mật khẩu và passwordConfirm
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords do not match",
      },
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
        validator: (phone) => /^\+?[1-9]\d{9,14}$/.test(phone),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    avatarImage: {
      type: String,
      default: "default-image.png",
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    task: {
      type: [String],
      default: [],
    },
});

//KHÔNG lưu passwordConfirm vào cơ sở dữ liệu
userSchema.pre("save", function (next) {
  this.passwordConfirm = undefined;
  next();
});


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
