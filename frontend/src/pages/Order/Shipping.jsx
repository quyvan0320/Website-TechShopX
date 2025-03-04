import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BreakCrumb from "../../components/BreakCrumb";
import ProgressSteps from "../../components/ProgressSteps";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { isPhoneNumber, isRequire } from "../../utils/validation";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress = {} } = cart;
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [phoneNumber, setPhoneNumber] = useState(
    shippingAddress.phoneNumber || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const validateInputs = () => {
    const phoneNumberError =
      isRequire(phoneNumber, "Vui lòng nhập đúng số điện thoại") ||
      isPhoneNumber(phoneNumber, "Nhập đúng số điện thoại");
    if (phoneNumberError) {
      toast.error(phoneNumberError);
      return false;
    }

    const addressError = isRequire(address, "Vui lòng nhập địa chỉ (số đường, quận, huyện)");
    if (addressError) {
      toast.error(addressError);
      return false;
    }

    const cityError = isRequire(city, "Vui lòng nhập địa chỉ (thành phố)");
    if (cityError) {
      toast.error(cityError);
      return false;
    }

    const countryError = isRequire(country, "Vui lòng nhập địa chỉ (quốc gia)");
    if (countryError) {
      toast.error(countryError);
      return false;
    }
    return true;
  };

  const maintenance = () => {
    toast.error("Chức năng đang bảo trì");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    try {
      dispatch(saveShippingAddress({ phoneNumber, address, city, country }));
      dispatch(savePaymentMethod(paymentMethod));
      navigate("/placeorder");
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };
  return (
    <>
      <div className="py-12 bg-primary-dark">
        <div className="mx-auto container max-w-screen-xl min-h-[80vh] ">
          <ProgressSteps step1 step2 />
          <form
            onSubmit={submitHandler}
            className="max-w-screen-sm mx-auto  px-6 py-4 mt-4"
          >
            <h1 className="text-3xl font-bold text-white text-center font-arya mb-8">
              Thông Tin Đặt Hàng
            </h1>
            <div className="mb-6">
              <div className="relative mt-1">
                <input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                  placeholder="số điện thoại..."
                  className="focus:outline-none text-primary-light  bg-transparent px-4 py-2 w-full border"
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="relative mt-1">
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="địa chỉ..."
                  className="focus:outline-none text-primary-light  bg-transparent px-4 py-2 w-full border"
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="relative mt-1">
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="thành phố..."
                  className="focus:outline-none text-primary-light  bg-transparent px-4 py-2 w-full border"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="relative mt-1">
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  placeholder="quốc gia..."
                  className="focus:outline-none text-primary-light  bg-transparent px-4 py-2 w-full border"
                />
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-white font-medium text-lg">
                Chọn hình thức thanh toán:
              </h1>
              <div className="relative mt-1 flex items-center gap-2">
                <input
                  type="radio"
                  value={"PayPal"}
                  name="paymentMethod"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="before:content[''] relative h-4 w-4 
                            appearance-none rounded-full border border-neutral-300 bg-neutral-50 
                            before:invisible before:absolute before:left-1/2 before:top-1/2 before:h-1.5 
                            before:w-1.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full
                             before:bg-neutral-100 checked:border-primary-blue checked:bg-primary-blue 
                             checked:before:visible focus:outline focus:outline-2 focus:outline-offset-2
                              focus:outline-neutral-800 checked:focus:outline-primary-blue 
                              disabled:cursor-not-allowed dark:border-neutral-700 dark:bg-neutral-900
                               dark:before:bg-primary-blue dark:checked:border-white dark:checked:bg
                               -white dark:focus:outline-neutral-300 dark:checked:focus:outline-white"
                />
                <span className="text-white">PayPal hoặc thẻ tín dụng</span>
              </div>
              <div
                onClick={maintenance}
                className="relative mt-1 flex items-center gap-2"
              >
                <input
                  type="radio"
                  value={""}
                  name=""
                  disabled
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="before:content[''] relative h-4 w-4 
                            appearance-none rounded-full border border-neutral-300 bg-neutral-50 
                            before:invisible before:absolute before:left-1/2 before:top-1/2 before:h-1.5 
                            before:w-1.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full
                             before:bg-neutral-100 checked:border-primary-blue checked:bg-primary-blue 
                             checked:before:visible focus:outline focus:outline-2 focus:outline-offset-2
                              focus:outline-neutral-800 checked:focus:outline-primary-blue 
                              disabled:cursor-not-allowed dark:border-neutral-700 dark:bg-neutral-900
                               dark:before:bg-primary-blue dark:checked:border-white dark:checked:bg
                               -white dark:focus:outline-neutral-300 dark:checked:focus:outline-white"
                />
                <span className="text-gray-200">Thanh toán khi nhận hàng</span>
              </div>
            </div>

            <button type="submit" className="btn-hover-effect">
              <span className="relative z-10 ">Tiếp Theo</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
