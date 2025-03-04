import React, { useState } from "react";
import AdminMenu from "./AdminMenu";
import { useFetchAllOrdersQuery } from "../../redux/api/orderApiSlice";
import moment from "moment";
import numeral from "numeral";
import Loader from "../../components/Loader";
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";

const Orders = () => {
  const { data: orders, isLoading, error } = useFetchAllOrdersQuery();

  // Trạng thái tìm kiếm và phân trang
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số lượng người dùng trên mỗi trang
  const [sortBy, setSortBy] = useState("");

  // Lọc đơn hàng theo tìm kiếm
  const filteredOrders = orders
    ?.filter((order) =>
      order.user?.username?.toLowerCase().includes(search.toLowerCase())
    )
    ?.sort((a, b) => {
      if (sortBy === "price") {
        return b.totalPrice - a.totalPrice; // Sắp xếp theo giá giảm dần
      } else if (sortBy === "price-high") {
        return a.totalPrice - b.totalPrice; // Sắp x
      } else if (sortBy === "date") {
        return new Date(b.createdAt) - new Date(a.createdAt); // Sắp xếp theo ngày mới nhất
      } else if (sortBy === "date-ago") {
        return new Date(a.createdAt) - new Date(b.createdAt); // Sắp xếp theo ngày cũ nhất
      } else if (sortBy === "a-z") {
        return a.user.username.localeCompare(b.user.username); // Sắp xếp tên người dùng từ A-Z
      } else if (sortBy === "z-a") {
        return b.user.username.localeCompare(a.user.username); // Sắp xếp tên người dùng từ Z-A
      } else if (sortBy === "isPaid") {
        return a.isPaid === b.isPaid ? 0 : a.isPaid ? -1 : 1; // Sắp xếp theo trạng thái thanh toán
      } else if (sortBy === "isDelivered") {
        return a.isDelivered === b.isDelivered ? 0 : a.isDelivered ? -1 : 1; // Sắp xếp theo trạng thái giao hàng
      }
      return 0; // Không sắp xếp nếu không chọn bộ lọc
    });

  // Tính toán tổng số trang và dữ liệu hiện tại
  const totalPages = Math.ceil(filteredOrders?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  };

  // Xử lý thay đổi sắp xếp
  const handleSortChange = (e) => {
    setSortBy(e.target.value); // Cập nhật giá trị sortBy
    setCurrentPage(1); // Reset về trang đầu tiên
  };

  // Xử lý chuyển trang
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container mx-auto max-w-screen-xl min-h-[80vh] relative pb-8">
      <h1 className="text-3xl font-bold text-white font-arya mt-6 mb-4 ">
        Quản Lý Đơn Hàng
      </h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error?.data?.error || error.message}</Message>
      ) : (
        <div className="text-primary-dark pr-8">
          <div className="flex  items-center justify-between mb-6">
            <div>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên..."
                className="border p-2 rounded w-full"
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div>
              <label htmlFor="sort">Sắp xếp theo: </label>
              <select id="sort" value={sortBy} onChange={handleSortChange} className="bg-gray-300 px-2 py-2 font-semibold text-gray-900 focus:outline-none">
                <option value="">Sắp xếp theo</option>
                <option value="price">Tổng giảm dần</option>
                <option value="price-high">Tổng tăng dần</option>
                <option value="date">Ngày mới nhất</option>
                <option value="date-ago">Ngày cũ nhất</option>
                <option value="a-z">Tên người dùng A-Z</option>
                <option value="z-a">Tên người dùng Z-A</option>
                <option value="isPaid">Trạng thái thanh toán</option>
                <option value="isDelivered">Trạng thái giao hàng</option>
              </select>
            </div>
          </div>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className=" text-white">
                <th className="border border-gray-300 px-2 py-2 text-[16px] text-center">
                  ID
                </th>

                <th className="border border-gray-300 px-2 py-2 text-[16px] text-center">
                  TÊN
                </th>
                <th className="border border-gray-300 px-2 w-[22%] py-2 text-[16px] text-center">
                  SẢN PHẨM
                </th>
                <th className="border border-gray-300 px-2 py-2 text-[16px] text-center">
                  THỜI GIAN
                </th>
                <th className="border border-gray-300 px-2 py-2 text-[16px] text-center">
                  TỔNG
                </th>
                <th className="border border-gray-300 px-2 py-2 text-[16px] text-center">
                  THANH TOÁN
                </th>
                <th className="border border-gray-300 px-2 py-2 text-[16px] text-center">
                  GIAO HÀNG
                </th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 && (
                currentOrders?.map((order, index) => (
                  <tr
                    key={order._id}
                    className={`${
                      index % 2 === 0 ? "bg-primary-bgthin" : "bg-primary-bgthin"
                    }  text-center relative group text-white`}
                  >
                    <td className="border text-[12px] border-gray-300 text-white px-2 py-2">
                      #{order._id}
                    </td>
                    <td className="border border-gray-300 px-2 text-sm py-2">
                      {order.user ? order.user.username : "N/A"}
                    </td>
                    <td className="border text-sm border-gray-300 px-2 py-2">
                      {order?.orderItems.map((orderItem, index) => (
                        <p
                          key={index}
                          className="flex flex-wrap justify-center text-sm"
                        >
                          {orderItem.name} ({orderItem.qty})
                          {index !== order?.orderItems.length - 1 && ","}
                        </p>
                      ))}
                    </td>
                    <td className="border border-gray-300 px-2 text-[14px] py-2">
                      {moment(order.createdAt).format("HH:mm DD/MM/YYYY")}
                    </td>
                    <td className="border border-gray-300 text-sm px-2 py-2">
                      {numeral(order.totalPrice)
                        .format("0,0")
                        .replace(/,/g, ".")}
                      ₫
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      {order.isPaid ? (
                        <span className="text-sm font-normal flex items-center justify-center text-green-500 ">
                          <FaCheck />
                        </span>
                      ) : (
                        <span className="text-sm font-normal flex items-center justify-center gap-1 text-orange-500 ">
                          <FaTimesCircle />
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      {order.isDelivered ? (
                        <span className="text-sm font-normal flex items-center justify-center text-green-500 ">
                          <FaCheck />
                        </span>
                      ) : (
                        <span className="text-sm font-normal flex items-center justify-center text-orange-500 ">
                          <FaTimesCircle />
                        </span>
                      )}
                    </td>
                    <Link
                      to={`/admin/order-detail/${order._id}`}
                      className="absolute hidden group-hover:block right-2 cursor-pointer top-[50%] -translate-y-[50%] "
                    >
                      <MdMoreVert size={22} />
                    </Link>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {currentOrders.length === 0 && (
            <p className="text-center text-white w-full px-4 font-bold py-3 text-xl">
              Không có đơn hàng
            </p>
          )}
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
      )}
    </div>
  );
};

export default Orders;
