import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import ProgressSteps from "../../components/ProgressSteps";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import numeral from "numeral";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useApplyVoucherMutation } from "../../redux/api/voucherApiSlice";
import { isRequire } from "../../utils/validation";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [voucherCode, setVoucherCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(cart.totalPrice);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const [applyVoucherApi, { isLoading: applyingVoucher }] =
    useApplyVoucherMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const finalPrice = discountedPrice || cart.totalPrice;
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: finalPrice,
        voucherCode,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      console.error(err.message);
      toast.error(err?.data?.error || "Có lỗi xảy ra khi đặt hàng.");
    }
  };

  const applyVoucherHandler = async () => {
    if (!voucherCode) {
      toast.error("Vui lòng nhập mã voucher.");
      return;
    }

    try {
      const res = await applyVoucherApi({
        voucherCode,
        totalPrice: cart.totalPrice,
      }).unwrap();

      if (res?.discountedPrice) {
        setDiscountedPrice(res.discountedPrice);
        toast.success(res.message || "Áp dụng voucher thành công.");
      } else {
        toast.error("Voucher không hợp lệ.");
      }
    } catch (err) {
      toast.error(err?.data?.error || "Có lỗi xảy ra khi áp dụng voucher.");
    }
  };

  return (
    <div className="py-12 bg-primary-dark">
      <div className="mx-auto container max-w-screen-lg min-h-[80vh]">
        <ProgressSteps step1 step2 step3 />
        {cart.cartItems?.length === 0 ? (
          <div>Giỏ hàng của bạn đang trống!</div>
        ) : (
          <div className="mt-8 p-4 lg:p-0">
            <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_1fr]">
              <div className="bg-primary-bgthin text-left px-2  font-bold text-lg py-2  text-primary-light">
                Hình Ảnh
              </div>
              <div className="bg-primary-bgthin text-left px-2 font-bold text-lg py-2   text-primary-light">
                Tên
              </div>
              <div className="bg-primary-bgthin text-left px-2  font-bold text-lg py-2  text-primary-light ">
                Số Lượng
              </div>
              <div className="bg-primary-bgthin text-right px-2  font-bold text-lg py-2  text-primary-light">
                Tổng
              </div>
            </div>
            {cart.cartItems.map((item, index) => (
              <div
                key={item._id}
                className="flex flex-col md:grid grid-cols-[1fr_1.5fr_1fr_1fr] items-center py-2 border-b border-primary-border"
              >
                <Link to={`/product/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[100px] h-[100px] object-cover object-center"
                  />
                </Link>
                <div className=" text-white md:py-6 space-y-3">
                  <p className="text-xl font-arya">{item.name}</p>
                  <p className="font-bold text-center md:text-left text-primary-red">
                    {numeral(item.price).format("0,0").replace(/,/g, ".")}₫
                  </p>
                </div>
                <div className=" text-white font-bold">{item.qty}</div>
                <p className="text-right font-bold text-white">
                  {numeral(item.price * item.qty)
                    .format("0,0")
                    .replace(/,/g, ".")}
                  ₫
                </p>
              </div>
            ))}

            <div className="mt-8">
              <h2 className=" font-arya text-white text-xl">
                Xác Nhận Đơn Hàng
              </h2>
              <div className="bg-primary-bgthin p-4 rounded-md mt-2 flex flex-col md:flex-row justify-between items-start">
                <div className="space-y-1">
                  <p className="flex items-center font-medium gap-2 text-white">
                    SẢN PHẨM:
                    <span className="text-sm font-normal flex items-center gap-1 text-primary-light">
                      {numeral(cart.itemsPrice)
                        .format("0,0")
                        .replace(/,/g, ".")}
                      ₫
                    </span>
                  </p>
                  <p className="flex items-center font-medium gap-2 text-white">
                    PHÍ GIAO HÀNG:
                    <span className="text-sm font-normal flex items-center gap-1 text-primary-light">
                      {numeral(cart.shippingPrice)
                        .format("0,0")
                        .replace(/,/g, ".")}
                      ₫
                    </span>
                  </p>
                  <p className="flex items-center font-medium gap-2 text-white">
                    THUẾ:
                    <span className="text-sm font-normal flex items-center gap-1 text-primary-light">
                      {numeral(cart.taxPrice).format("0,0").replace(/,/g, ".")}₫
                    </span>
                  </p>
                  <div className="space-y-1">
                    <p className="flex items-center font-medium gap-2 text-white">
                      TỔNG:
                      <span
                        className={`text-sm font-normal flex items-center gap-1 ${
                          discountedPrice !== cart.totalPrice
                            ? "line-through text-primary-red"
                            : "text-primary-light"
                        }`}
                      >
                        {numeral(cart.totalPrice)
                          .format("0,0")
                          .replace(/,/g, ".")}
                        ₫
                      </span>
                    </p>
                    {discountedPrice !== cart.totalPrice && (
                      <p className="flex items-center font-medium gap-2 text-white">
                        TỔNG (Sau giảm giá):
                        <span className="text-sm font-normal flex items-center gap-1 text-primary-light">
                          {numeral(discountedPrice)
                            .format("0,0")
                            .replace(/,/g, ".")}
                          ₫
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-white text-lg">
                    Địa Chỉ Nhận Hàng
                  </h3>
                  <p className="flex items-center font-medium gap-2 text-white">
                    Địa Chỉ:
                    <span className="text-sm font-normal flex items-center gap-1 text-primary-light">
                      {cart.shippingAddress.address},{" "}
                      {cart.shippingAddress.city},{" "}
                      {cart.shippingAddress.country}
                    </span>
                  </p>
                  <p className="flex items-center font-medium gap-2 text-white">
                    Số Điện Thoại:
                    <span className="text-sm font-normal flex items-center gap-1 text-primary-light">
                      {cart.shippingAddress.phoneNumber}
                    </span>
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-white text-lg">
                    Phương Thức Thanh Toán
                  </h3>
                  <p className="flex items-center font-medium gap-2 text-white">
                    Phương Thức:
                    <span className="text-sm font-normal flex items-center gap-1 text-primary-light">
                      {cart.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>

              {discountedPrice === cart.totalPrice && (
                <div className="flex gap-2 items-center mt-4">
                  <input
                    type="text"
                    placeholder="Nhập mã voucher"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="p-1 text-black focus:outline-none"
                  />
                  <button
                    onClick={applyVoucherHandler}
                    className="btn-hover-effect p-1 text-sm hover:text-primary-blue"
                  >
                    Áp Dụng
                  </button>
                </div>
              )}

              <div className="flex justify-end mt-6 md:mt-0">
                <button
                  type="submit"
                  disabled={!cart.cartItems.length}
                  className="btn-hover-effect mt-2"
                  onClick={placeOrderHandler}
                >
                  <span className="relative z-10 ">Đặt Hàng</span>
                </button>
                {isLoading && <Loader />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;
