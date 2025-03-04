import express from "express";

import { authenticate, authrizedAdmin } from "../middlewares/authMiddleware.js";
import {
  applyVoucher,
  createVoucher,
  deleteVoucher,
  fetchAllVouchers,
} from "../controllers/voucherController.js";

const router = express.Router();

router.post("/", authenticate, authrizedAdmin, createVoucher);
router.get("/", authenticate, authrizedAdmin, fetchAllVouchers);
router.delete("/:id", authenticate, authrizedAdmin, deleteVoucher);
router.post("/apply-voucher", applyVoucher);

export default router;
