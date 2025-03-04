import mongoose from 'mongoose';

const voucherSchema = mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ['percent', 'fixed'], required: true },
  discountValue: { type: Number, required: true },
  minimumOrderAmount: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
});

const Voucher = mongoose.model('Voucher', voucherSchema);
export default Voucher;
