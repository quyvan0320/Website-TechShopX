import asyncHandler from "../middlewares/asyncHandler.js";
import Voucher from "../models/voucherModel.js";

const createVoucher = asyncHandler(async (req, res) => {
  const { code, discountType, discountValue, minimumOrderAmount } = req.body;

  const existingVoucher = await Voucher.findOne({ code });
  if (existingVoucher) {
    return res.status(400).json({ error: "Voucher đã tồn tại" });
  }

  const voucher = new Voucher({
    code,
    discountType,
    discountValue,
    minimumOrderAmount,
  });

  const createdVoucher = await voucher.save();
  res.status(201).json(createdVoucher);
});

const fetchAllVouchers = asyncHandler(async (req, res) => {
  try {
    // Lấy tất cả voucher từ cơ sở dữ liệu
    const vouchers = await Voucher.find();

    // Kiểm tra nếu không có voucher nào
    if (!vouchers || vouchers.length === 0) {
      return res.status(404).json({ error: "Không có voucher nào" });
    }

    res.status(200).json(vouchers);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy dữ liệu voucher" });
  }
});

const deleteVoucher = asyncHandler(async (req, res) => {
  const voucher = await Voucher.findById(req.params.id);
  if (!voucher) {
    return res.status(404).json({ error: "Voucher không tồn tại" });
  }

  await voucher.deleteOne();
  res.status(200).json({ message: "Voucher đã được xóa" });
});

const applyVoucher = asyncHandler(async (req, res) => {
    const { voucherCode, totalPrice } = req.body;
  
    if (!voucherCode || !totalPrice) {
      return res.status(400).json({ error: "Vui lòng cung cấp mã voucher và giá trị đơn hàng" });
    }
  
    // Tìm voucher từ database
    const voucher = await Voucher.findOne({ code: voucherCode, isActive: true });
  
    if (!voucher) {
      return res.status(400).json({ error: "Voucher không hợp lệ hoặc đã hết hạn" });
    }
  
    // Kiểm tra giá trị tối thiểu của đơn hàng
    if (totalPrice < voucher.minimumOrderAmount) {
      return res.status(400).json({
        error: `Đơn hàng cần tối thiểu ${voucher.minimumOrderAmount} để sử dụng voucher`,
      });
    }
  
    // Tính toán giảm giá
    let discount = 0;
    if (voucher.discountType === "percent") {
      discount = (totalPrice * voucher.discountValue) / 100;
    } else if (voucher.discountType === "fixed") {
      discount = voucher.discountValue;
    }
  
    // Tính toán giá trị sau khi giảm
    const discountedPrice = totalPrice - discount;
  
    res.status(200).json({
      success: true,
      discount,
      discountedPrice,
      message: `Voucher áp dụng thành công! Bạn được giảm ${discount.toLocaleString()}₫`,
    });
  });
  
  
export { createVoucher, deleteVoucher, fetchAllVouchers, applyVoucher };
