import express from "express";
import { authenticate, authrizedAdmin } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategoryById,
  deleteCategoryById,
  fetchAllCategories,
  fetchCategoryById,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", authenticate, authrizedAdmin, createCategory);
router.put("/:id", authenticate, authrizedAdmin, updateCategoryById);
router.delete("/:id", authenticate, authrizedAdmin, deleteCategoryById);

router.get("/", fetchAllCategories);
router.get("/:id", fetchCategoryById);

export default router;
