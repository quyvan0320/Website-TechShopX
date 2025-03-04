import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchOrderByIdQuery,
  useMarkOrderAsDeliveredMutation,
} from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import moment from "moment";
import numeral from "numeral";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useFetchOrderByIdQuery(orderId);
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useMarkOrderAsDeliveredMutation();
  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
    navigate("/admin/orders");
    toast.success("Đã danh dấu giao hàng thành công");
  };
  return (
    <div className="container mx-auto max-w-screen-xl min-h-[80vh] relative">
      <h1 className="text-3xl font-bold text-white font-arya mt-6 mb-4">
        Chi Tiết Đơn Hàng
      </h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"error"}>{error.data.error}</Message>
      ) : (
        <main className="pr-8">
          <div className="grid grid-cols-[2.5fr_1.5fr] h-screen gap-8">
            {/* Phần thông tin đơn hàng */}
            <div className="">
              {order.orderItems?.length === 0 ? (
                <div>Đơn hàng của bạn đang trống!</div>
              ) : (
                <div className="space-y-3 bg-primary-bgthin p-4 rounded-m">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={item._id}
                      className="flex gap-3 items-center w-full "
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          className="w-[94px] h-[80px] object-cover object-center rounded-md border-2 border-gray-300"
                          alt={item.name}
                        />
                        <div className="absolute -top-1 -right-1 w-[22px]  h-[22px] font-bold text-center text-[14px] bg-gray-600 text-white rounded-full">
                          {item.qty}
                        </div>
                      </div>
                      <div className="flex items-start justify-between w-full">
                        <div>
                          <p className="text-sm text-white font-medium">
                            {item.name}
                          </p>
                          <p className="text-sm text-red-500 font-bold">
                            {numeral(item.price)
                              .format("0,0")
                              .replace(/,/g, ".")}
                            ₫
                          </p>
                        </div>
                        <p className="text-sm text-white font-medium">
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
                    <span className="text-white text-sm font-medium">
                      Tổng phụ
                    </span>
                    <span className="text-white text-sm font-bold">•</span>
                    <span className="text-white text-sm font-medium">
                      {order?.orderItems.reduce(
                        (acc, item) => acc + item.qty,
                        0
                      )}{" "}
                      sản phẩm
                    </span>
                  </div>
                  <p className="text-white text-sm font-medium">
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
                    <span className="text-white text-sm font-medium">
                      Phí vận chuyển
                    </span>
                  </div>
                  <p className="text-white text-sm font-medium">
                    {numeral(order.shippingPrice)
                      .format("0,0")
                      .replace(/,/g, ".")}
                    ₫
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium">Thuế</span>
                  </div>
                  <p className="text-white text-sm font-medium">
                    {numeral(order.taxPrice).format("0,0").replace(/,/g, ".")}₫
                  </p>
                </div>

                {order.isDiscounted === true ? (
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-lg font-semibold">
                        Tổng Tất Cả
                      </span>
                      <span className="text-white text-sm font-semibold">
                        (đã áp dụng voucher)
                      </span>
                    </div>
                    <p className="text-white text-lg font-semibold">
                      {numeral(order.totalPrice)
                        .format("0,0")
                        .replace(/,/g, ".")}
                      ₫
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-lg font-semibold">
                        Tổng Tất Cả
                      </span>
                      <span className="text-white text-sm font-semibold">
                        (không áp dụng voucher)
                      </span>
                    </div>
                    <p className="text-white text-lg font-semibold">
                      {numeral(order.totalPrice)
                        .format("0,0")
                        .replace(/,/g, ".")}
                      ₫
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              <h1 className="text-xl font-bold text-white text-left font-arya mb-4 ">
                Thông Tin Đơn Hàng
              </h1>
              <div className="space-y-2">
                <p className="flex items-center font-medium gap-3 text-white">
                  Đơn Hàng:
                  <span className="text-sm font-medium flex items-center gap-1 text-primary-light ">
                    #{order._id}
                  </span>
                </p>
                <p className="flex items-center font-medium gap-3 text-white">
                  Tên Khách Hàng:
                  <span className="text-sm font-medium flex items-center gap-1 text-primary-light ">
                    {order.user.username}
                  </span>
                </p>
                <p className="flex items-center font-medium gap-3 text-white">
                  Email:
                  <span className="text-sm font-medium flex items-center gap-1 text-primary-light ">
                    {order.user.email}
                  </span>
                </p>
                <p className="flex items-center font-medium gap-3 text-white">
                  Số Điện Thoại:
                  <span className="text-sm font-medium flex items-center gap-1 text-primary-light ">
                    {order.shippingAddress.phoneNumber}
                  </span>
                </p>
                <p className="font-medium gap-3 text-white">
                  Địa Chỉ:
                  <span className="text-sm font-medium flex items-center gap-1 text-primary-light ">
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.country}
                  </span>
                </p>
                <p className="flex items-center font-medium gap-3 text-white">
                  Phương Thức Thanh Toán:
                  <span className="text-sm font-medium flex items-center gap-1 text-primary-light ">
                    {order.paymentMethod}
                  </span>
                </p>

                <div className="flex justify-center w-full mt-2">
                  {order.isPaid ? (
                    <div className="flex gap-2 items-center justify-start w-full py-3 px-4  rounded-md bg-primary-light">
                      <FaCheck className="text-primary-blue" size={22} />{" "}
                      <span className="text-primary-blue text-sm font-medium">
                        Đã thanh toán lúc{" "}
                        {moment(order.paidAt).format("HH:mm:ss DD/MM/YYYY")}
                      </span>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center justify-start w-full py-3 px-4 rounded-md bg-primary-light">
                      <FaTimesCircle className="text-red-500 " size={22} />{" "}
                      <span className="text-red-500 text-sm font-medium">
                        Chưa thanh toán
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order?.isDelivered && (
                  <div>
                    <button
                      type="button"
                      className="bg-primary-blue rounded-md text-sm mt-4 px-4 py-2 text-white"
                      onClick={deliverHandler}
                    >
                      Đánh giấu đã giao hàng
                    </button>
                  </div>
                )}
            </div>

            {/* Phần danh sách đơn hàng với nền xám */}
          </div>
        </main>
      )}
    </div>
  );
};

export default OrderDetail;
