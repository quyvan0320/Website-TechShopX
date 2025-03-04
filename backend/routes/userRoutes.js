import express from "express";
import {
  login,
  register,
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
} from "../controllers/userController.js";
import { authenticate, authrizedAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// auth
router.post("/", register);
router.post("/login", login);
router.post("/login-admin", loginAdmin);
router.post("/logout", logout);

// user
router.get("/profile", authenticate, fetchUserProfile);
router.put("/profile", authenticate, updateUserProfile);

// admin
router.get("/", authenticate, authrizedAdmin, fetchAllUsers);
router.get("/:id", authenticate, authrizedAdmin, fetchUserById);
router.delete("/:id", authenticate, authrizedAdmin, deleteUserById);
router.put("/:id", authenticate, authrizedAdmin, updateUserById);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;
