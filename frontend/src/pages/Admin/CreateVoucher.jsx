import React, { useState } from "react";
import { useCreateVoucherMutation } from "../../redux/api/voucherApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isRequire } from "../../utils/validation";

const CreateVoucher = () => {
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("percent");
  const [discountValue, setDiscountValue] = useState(1);
  const [minimumOrderAmount, setMinimumOrderAmount] = useState(1500000);

  const [createVoucher, { isLoading, error }] = useCreateVoucherMutation();
  const navigate = useNavigate();
  const validateInputs = () => {
    const codeError = isRequire(code, "Nhập mã voucher");
    if (codeError) {
      toast.error(codeError);
      return false;
    }
    const discountValueError = isRequire(
      discountValue,
      "Nhập giảm theo % voucher"
    );
    if (discountValueError) {
      toast.error(discountValueError);
      return false;
    }
    const minimumOrderAmountError = isRequire(
      minimumOrderAmount,
      "Nhập giá được áp dụng"
    );
    if (minimumOrderAmountError) {
      toast.error(minimumOrderAmountError);
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    if (minimumOrderAmount < 1500000) {
      toast.error("Áp dụng với hóa đơn 1.500.000₫ trở lên");
      return
    }
    if (discountValue > 20) {
      toast.error("Không được giảm quá 20%");
      return
    } 

    if (discountValue < 5) {
      toast.error("Không được giảm quá 5%");
      return
    } 

    try {
      const newVoucher = {
        code,
        discountType,
        discountValue,
        minimumOrderAmount,
      };

      const { data } = await createVoucher(newVoucher);
      toast.success(`Voucher ${data.code} đã được thêm`);
      navigate("/admin/vouchers");
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  return (
    <div className="container mx-auto max-w-screen-xl min-h-[80vh] relative pb-8">
      <h1 className="text-3xl font-bold text-white font-arya mt-6 mb-4 ">
        Tạo Voucher
      </h1>
      <div className="text-white pr-8">
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-1/2 mx-auto gap-4"
          >
            <div>
              <label className="font-medium text-[16px] text-white block">
                Mã Voucher
              </label>
              <input
                type="text"
                placeholder="Mã Voucher"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-gray-900 border  border-gray-300  text-sm font-semibold px-4 rounded-md py-2 focus:outline-none  w-full"
              />
            </div>
            <div>
              <label className="font-medium text-[16px] text-white block">
                Phần Trăm Giảm Giá
              </label>
              <input
                type="number"
                placeholder="Giá trị giảm giá"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="text-gray-900 border  border-gray-300  text-sm font-semibold px-4 rounded-md py-2 focus:outline-none  w-full"
              />
            </div>
            <div>
              <label className="font-medium text-[16px] text-white block">
                Số Tiền Áp Dụng
              </label>
              <input
                type="number"
                placeholder="Số tiền tối thiểu"
                value={minimumOrderAmount}
                onChange={(e) => setMinimumOrderAmount(e.target.value)}
                className="text-gray-900 border  border-gray-300  text-sm font-semibold px-4 rounded-md py-2 focus:outline-none  w-full"
              />
            </div>
            <button
              className="rounded-sm text-lg text-white font-bold bg-primary-blue px-4 py-2 block"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Đang tạo..." : "Tạo Voucher"}
            </button>
          </form>
          {error && <div>{error.message}</div>}
        </div>
      </div>
    </div>
  );
};

export default CreateVoucher;
