import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";
const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      return res.status(400).json({
        error: "Tài khoản chưa được xác thực, token lỗi hoặc không đúng",
      });
    }
  } else {
    return res
      .status(400)
      .json({ error: "Tài khoản chưa được xác thực, không có token" });
  }
});

const authrizedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res
      .status(400)
      .json({ error: "Tài khoản chưa được xác thực, không phải admin" });
  }
};

export { authenticate, authrizedAdmin };
