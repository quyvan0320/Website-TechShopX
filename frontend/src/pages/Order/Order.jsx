import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useFetchOrderByIdQuery,
  useFetchPaypalClientIdQuery,
  useMarkOrderAsDeliveredMutation,
  useMarkOrderAsPaidMutation,
} from "../../redux/api/orderApiSlice";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { IoCartOutline } from "react-icons/io5";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import numeral from "numeral";
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import moment from "moment";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";

const Order = () => {
  const logoOrder = "/Logoorder.png";
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  // lay tu trong co so du lieu gia tong tu day chua dc cap nhat
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useFetchOrderByIdQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = useMarkOrderAsPaidMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useMarkOrderAsDeliveredMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useFetchPaypalClientIdQuery();
  console.log(order);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadingPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: { "client-id": paypal.clientId, currency: "USD" },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);
  console.log(order);
  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Thanh toán đơn hàng thành công");
      } catch (error) {
        console.log(error.message);
        toast.error(error?.data?.error);
      }
    });
  }

  function convertVNDToUSD(vndAmount, exchangeRate = 24000) {
    return (vndAmount / exchangeRate).toFixed(2); // Làm tròn 2 chữ số thập phân
  }

  function onError(err) {
    toast.error(err.message);
  }
  console.log(order);
  function createOrder(data, actions) {
    const usdAmount = convertVNDToUSD(order.totalPrice); // Chuyển đổi VND sang USD
    return actions.order
      .create({
        purchase_units: [{ amount: { value: usdAmount } }], // Sử dụng giá trị USD
      })
      .then((orderID) => {
        return orderID;
      });
  }
  return (
    <div>
      <header className=" bg-white border-b border-gray-300 py-4">
        <nav className="container max-w-screen-lg px-4 lg:px-0 mx-auto flex items-center justify-between">
          <img
            src={logoOrder}
            className="w-[120px] md:w-[200px] lg:w-[300px] object-cover object-center"
            alt=""
          />
          <Link to="/cart">
            <div className="text-primary-blue hover:text-primary-bgthin transition-all-ease relative">
              <IoCartOutline size={30} />
            </div>
          </Link>
        </nav>
      </header>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"error"}>{error.data.error}</Message>
      ) : (
        <main>
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:h-screen">
            {/* Phần thông tin đơn hàng */}
            <div className="p-4 lg:pl-[162px]">
              <h1 className="text-2xl font-bold text-primary-dark text-left font-arya mb-4 ">
                Thông Tin Đơn Hàng
              </h1>
              <div className="space-y-2">
                <p className="flex items-center font-medium gap-3 text-primary-dark">
                  Đơn Hàng:
                  <span className="text-sm font-medium flex items-center gap-1 text-primary-bgthin ">
                    #{order._id}
                  </span>
                </p>
                <p className="flex items-center font-medium gap-3 text-primary-dark">
                  Tên Khách Hàng:
                  <span className="text-sm font-medium flex items-center gap-1 text-primary-bgthin ">
                    {order.user.username}
                  </span>
                </p>
                <p className="flex items-center font-medium gap-3 text-primary-dark">
                  Email:
                  <span className="text-sm font-medium flex items-center gap-1 text-primary-bgthin ">
                    {order.user.email}
                  </span>
                </p>
                <p className="flex items-center font-medium gap-3 text-primary-dark">
                  Số Điện Thoại:
                  <span className="text-sm font-medium flex items-center gap-1 text-primary-bgthin ">
                    {order.shippingAddress.phoneNumber}
                  </span>
                </p>
                <p className="flex items-center font-medium gap-3 text-primary-dark">
                  Địa Chỉ:
                  <span className="text-sm font-medium flex items-center gap-1 text-primary-bgthin ">
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.country}
                  </span>
                </p>
                <p className="flex items-center font-medium gap-3 text-primary-dark">
                  Phương Thức Thanh Toán:
                  <span className="text-sm font-medium flex items-center gap-1 text-primary-bgthin ">
                    {order.paymentMethod}
                  </span>
                </p>

                <div className="flex justify-center w-full mt-2">
                  {order.isPaid ? (
                    <div className="flex gap-2 items-center justify-start w-full py-3 px-4  rounded-md bg-gray-100">
                      <FaCheck className="text-primary-blue" size={22} />{" "}
                      <span className="text-primary-blue text-sm font-medium">
                        Đã thanh toán lúc{" "}
                        {moment(order.paidAt).format("HH:mm:ss DD/MM/YYYY")}
                      </span>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center justify-start w-full py-3 px-4 rounded-md bg-gray-100">
                      <FaTimesCircle className="text-red-500 " size={22} />{" "}
                      <span className="text-red-500 text-sm font-medium">
                        Chưa thanh toán
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {!order.isPaid && (
                <div>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div className="mt-8">
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order?.isDelivered && (
                  <div>
                    <button className="button" onClick={deliverHandler}>
                      Đánh giấu đã giao hàng
                    </button>
                  </div>
                )}
              <div className="flex items-center justify-between ">
                <Link
                  to={"/"}
                  className="flex items-center gap-2 mt-8 font-medium text-primary-dark"
                >
                  <IoIosArrowRoundBack /> <span>quay lại</span>
                </Link>

                <Link
                  to={"/my-orders"}
                  className="flex items-center gap-2 mt-8  text-white font-bold rounded-md bg-primary-blue px-4 py-2"
                >
                  <span>Đơn hàng của tôi</span>
                </Link>
              </div>
            </div>

            {/* Phần danh sách đơn hàng với nền xám */}
            <div className="bg-gray-100 p-4 overflow-y-auto lg:pr-[162px] border-l border-gray-300">
              {order.orderItems?.length === 0 ? (
                <div>Đơn hàng của bạn đang trống!</div>
              ) : (
                <div className="space-y-2">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={item._id}
                      className="flex gap-3 items-center w-full"
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          className="w-[94px] h-[80px] object-cover object-center rounded-md border-2 border-gray-300"
                          alt={item.name}
                        />
                        <div className="absolute -top-1 -right-1 w-[22px] h-[22px] font-bold text-center text-[14px] bg-gray-600 text-white rounded-full">
                          {item.qty}
                        </div>
                      </div>
                      <div className="flex items-start justify-between w-full">
                        <div>
                          <p className="text-sm text-primary-dark font-medium">
                            {item.name}
                          </p>
                          <p className="text-sm text-primary-blue">
                            {numeral(item.price)
                              .format("0,0")
                              .replace(/,/g, ".")}
                            ₫
                          </p>
                        </div>
                        <p className="text-sm text-primary-dark font-medium">
                          {numeral(item.price * item.qty)
                            .format("0,0")
                            .replace(/,/g, ".")}
                          ₫
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-12">
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary-dark text-sm font-medium">
                      Tổng phụ
                    </span>
                    <span className="text-primary-dark text-sm font-bold">
                      •
                    </span>
                    <span className="text-primary-dark text-sm font-medium">
                      {order?.orderItems.reduce(
                        (acc, item) => acc + item.qty,
                        0
                      )}{" "}
                      sản phẩm
                    </span>
                  </div>
                  <p className="text-primary-dark text-sm font-medium">
                    {numeral(
                      order?.orderItems.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      )
                    )
                      .format("0,0")
                      .replace(/,/g, ".")}
                    ₫
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary-dark text-sm font-medium">
                      Phí vận chuyển
                    </span>
                  </div>
                  <p className="text-primary-dark text-sm font-medium">
                    {numeral(order.shippingPrice)
                      .format("0,0")
                      .replace(/,/g, ".")}
                    ₫
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary-dark text-sm font-medium">
                      Thuế
                    </span>
                  </div>
                  <p className="text-primary-dark text-sm font-medium">
                    {numeral(order.taxPrice).format("0,0").replace(/,/g, ".")}₫
                  </p>
                </div>
                {order.isDiscounted === true ? (
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-primary-dark text-lg font-semibold">
                        Tổng Tất Cả
                      </span>
                      <span className="text-primary-dark text-sm font-semibold">
                      (đã áp dụng voucher)
                      </span>
                    </div>
                    <p className="text-primary-dark text-lg font-semibold">
                      {numeral(order.totalPrice)
                        .format("0,0")
                        .replace(/,/g, ".")}
                      ₫
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-primary-dark text-lg font-semibold">
                        Tổng Tất Cả
                      </span>
                      <span className="text-primary-dark text-sm font-semibold">
                        (không áp dụng voucher)
                      </span>
                    </div>
                    <p className="text-primary-dark text-lg font-semibold">
                      {numeral(order.totalPrice)
                        .format("0,0")
                        .replace(/,/g, ".")}
                      ₫
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Order;
