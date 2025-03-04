import React, { useState } from "react";
import { useFetchUserOrdersQuery } from "../../redux/api/orderApiSlice";
import BreakCrumb from "../../components/BreakCrumb";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import numeral from "numeral";
import moment from "moment";
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const MyOrders = () => {
  const { data: orders, isLoading, error } = useFetchUserOrdersQuery();

  // Trạng thái phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số lượng đơn hàng trên mỗi trang

  // Tính toán tổng số trang và dữ liệu hiện tại
  const totalPages = Math.ceil((orders?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = orders?.slice(startIndex, startIndex + itemsPerPage);

  // Xử lý chuyển trang
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <BreakCrumb heading={"Đơn Hàng Của Tôi"} />
      <div className="py-12 bg-primary-dark">
        <div className="container mx-auto max-w-screen-xl min-h-[80vh]">
          <h1 className="text-3xl font-bold text-white text-center font-arya mb-2">
            Đơn Hàng Của Tôi
          </h1>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="text-red-500 text-center">
              {error?.data?.error || error.message}
            </div>
          ) : (
            <div>
              {orders?.length > 0 ? (
                <div>
                  <div className="grid grid-cols-3 gap-8 mt-12">
                    {currentOrders?.map((order) => (
                      <div
                        className="bg-primary-bgthin col-span-1 relative rounded-md px-4 pt-4 py-6 mb-6"
                        key={order._id}
                      >
                        {order.isPaid ? (
                          <div>
                            <div className="bg-white w-[60px] absolute left-1/2 -translate-x-1/2 -top-7 h-[60px] rounded-full flex justify-center items-center">
                              <FaCheck
                                className="text-primary-blue "
                                size={30}
                              />
                            </div>
                            <p className="text-primary-blue text-lg font-medium text-center mt-4">
                              Đã thanh toán
                            </p>
                          </div>
                        ) : (
                          <div>
                            <div className="bg-white w-[60px] absolute left-1/2 -translate-x-1/2 -top-7 h-[60px] rounded-full flex justify-center items-center">
                              <FaTimesCircle
                                className="text-red-500 "
                                size={30}
                              />
                            </div>
                            <p className="text-red-500 text-lg font-medium text-center mt-4">
                              Chưa thanh toán
                            </p>
                          </div>
                        )}

                        <div className="space-y-2 mt-4">
                          <p className="flex items-center font-medium gap-3 text-white">
                            ID:
                            <span className="text-sm font-normal flex items-center gap-1 text-primary-light ">
                              #{order._id}
                            </span>
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <p className=" font-medium gap-3 text-white">
                              Sản Phẩm:
                            </p>

                            {order?.orderItems.map((orderItem, index) => (
                              <p
                                key={index}
                                className="flex flex-wrap justify-center text-sm font-normal text-primary-light"
                              >
                                {orderItem.name} ({orderItem.qty})
                                {index !== order?.orderItems.length - 1 && ","}
                              </p>
                            ))}
                          </div>
                          <p className="flex items-center font-medium gap-3 text-white">
                            Thời Gian:
                            <span className="text-sm font-normal flex items-center gap-1 text-primary-light ">
                              {moment(order.createdAt).format(
                                "HH:mm:ss DD/MM/YYYY"
                              )}
                            </span>
                          </p>
                          <p className="flex items-center font-medium gap-3 text-white">
                            Tổng:
                            <span className="text-sm font-normal flex items-center gap-1 text-primary-light ">
                              {numeral(order.totalPrice)
                                .format("0,0")
                                .replace(/,/g, ".")}
                              ₫
                            </span>
                          </p>
                          <p className="flex items-center font-medium gap-3 text-white">
                            Giao Hàng:
                            {order.isDelivered ? (
                              <span className="text-sm font-normal flex items-center gap-1 text-green-500 ">
                                Hoàn Thành
                              </span>
                            ) : (
                              <span className="text-sm font-normal flex items-center gap-1 text-orange-500 ">
                                Chờ Xử Lý
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="absolute bottom-3 right-4">
                          <Link to={`/order/${order._id}`}>
                            <button className="group text-white text-sm font-normal flex items-center bg-primary-blue px-2 py-1 transition-all duration-300">
                              Chi Tiết
                              <IoIosArrowForward className="ml-1 transform group-hover:translate-x-2 transition-transform duration-300" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Pagination */}
                  <div className="mt-4 flex justify-center">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 mx-1 rounded ${
                          currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-4xl font-bold text-white font-arya mb-6 text-center mt-8">
                    Không có đơn hàng
                  </h1>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
