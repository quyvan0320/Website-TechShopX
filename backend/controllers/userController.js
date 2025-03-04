import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

const register = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Vui lòng nhập đủ trường đăng ký" });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ error: "Email đã tồn tại" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      createToken(newUser._id, res);
      res.status(200).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      });
    } catch (error) {
      res.status(400);
      throw new Error("Lỗi đăng ký data");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Vui lòng nhập đủ trường đăng nhập" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Sai email đăng nhập" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Sai mật khẩu đăng nhập" });
    }

    createToken(user._id, res);
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Vui lòng nhập đủ trường đăng nhập" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Sai email đăng nhập" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Sai mật khẩu đăng nhập" });
    }

    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ error: "Tài khoản không có quyền quản trị" });
    }

    createToken(user._id, res);
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const logout = asyncHandler(async (req, res) => {
  try {
    res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
    res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "Người dùng không tìm thấy" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const alreadyUser = await User.findOne({ email: req.body.email });
      if (
        alreadyUser &&
        alreadyUser._id.toString() !== req.user._id.toString()
      ) {
        return res.status(400).json({ error: "Email đã tồn tại" });
      }

      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword;
      }
      await user.save();
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      return res.status(404).json({ error: "Người dùng không tìm thấy" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "Người dùng không tìm thấy" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.isAdmin) {
        return res.status(400).json({ error: "Không được xóa admin" });
      }
      await user.deleteOne({ _id: user._id });
      res.status(200).json({ message: "Người dùng đã được xóa" });
    } else {
      return res.status(404).json({ error: "Người dùng không tìm thấy" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin) || user.isAdmin;

      const alreadyUser = await User.findOne({ email: req.body.email });
      if (
        alreadyUser &&
        alreadyUser._id.toString() !== req.params.id.toString()
      ) {
        return res.status(400).json({ error: "Email đã tồn tại" });
      }
      await user.save();
      res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "Người dùng không tìm thấy" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Kiểm tra email
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ error: "Không tìm thấy tài khoản với email này" });
  }

  // Tạo token reset mật khẩu
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 3600000; // 1 giờ

  await user.save();

  // Tạo URL reset mật khẩu
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const message = `Vui lòng click vào liên kết sau để reset mật khẩu của bạn: ${resetUrl}`;

  try {
    await sendEmail({
      to: user.email,
      subject: "Reset mật khẩu của bạn",
      text: message,
    });

    res.status(200).json({ message: "Email reset mật khẩu đã được gửi" });
  } catch (error) {
    console.error("Error sending email:", error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(500).json({ error: "Không thể gửi email reset mật khẩu" });
  }
});

// Reset mật khẩu
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Hash token và tìm người dùng
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .json({ error: "Token không hợp lệ hoặc đã hết hạn" });
  }

  // Mã hóa mật khẩu mới
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Cập nhật mật khẩu
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res
    .status(200)
    .json({ message: "Mật khẩu của bạn đã được thay đổi thành công" });
});

export {
  register,
  login,
  logout,
  fetchUserProfile,
  updateUserProfile,
  fetchAllUsers,
  fetchUserById,
  deleteUserById, 
  updateUserById,
  loginAdmin,
  forgotPassword,
  resetPassword,
};
