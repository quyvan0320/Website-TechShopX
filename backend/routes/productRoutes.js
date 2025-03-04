import express from "express";
import { authenticate, authrizedAdmin } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  updateProductById,
  deleteProductById,
  addProductReviews,
  fecthAllProducts,
  fecthTopProducts,
  fecthNewProducts,
  fecthProductById,
  fecthProductQuery,
  filterProducts,
  fetchProductStats,
  fetchProductByQuery,

} from "../controllers/productController.js";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
const router = express.Router();

router.post("/", authenticate, authrizedAdmin, uploadMiddleware, createProduct);
router.delete("/:id", authenticate, authrizedAdmin, deleteProductById);
router.put(
  "/:id",
  authenticate,
  authrizedAdmin,
  uploadMiddleware,
  updateProductById
);

router.post("/reviews/:id", authenticate, addProductReviews);
router.get("/stats", fetchProductStats);
router.get("/search", fetchProductByQuery);
router.get("/new-products", fecthNewProducts);
router.get("/top-products", fecthTopProducts);
router.get("/all-products", fecthAllProducts);
router.post("/filtered-products", filterProducts);

router.get("/:id", fecthProductById);
router.get("/", fecthProductQuery);


export default router;
