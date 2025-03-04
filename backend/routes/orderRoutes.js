import express from "express";
import { authenticate, authrizedAdmin } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  fecthAllOrders,
  fecthUserOrders,
  fecthTotalOrders,
  fecthTotalSales,
  fecthTotalSalesDate,
  fecthOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
  fetchOrderStatusStats,
  fetchMonthlySales
} from "../controllers/orderController.js";
const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/", authenticate, authrizedAdmin, fecthAllOrders);
router.get("/status-stats", fetchOrderStatusStats);
router.get("/monthly-sales", fetchMonthlySales);
router.get("/my-orders", authenticate, fecthUserOrders);
router.get("/total-orders", fecthTotalOrders);
router.get("/total-sales", fecthTotalSales);
router.get("/total-sales-date", fecthTotalSalesDate);
router.get("/:id", authenticate, fecthOrderById);
router.put("/:id/pay", authenticate, markOrderAsPaid);
router.put("/:id/deliver", authenticate, authrizedAdmin, markOrderAsDelivered);

export default router;
