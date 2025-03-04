import React, { useState } from "react";
import { useFetchAllProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import moment from "moment";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import numeral from "numeral";
import AdminMenu from "./AdminMenu";
const Products = () => {
  const {
    data: products,
    refetch,
    isLoading,
    error,
  } = useFetchAllProductsQuery();

  // Trạng thái tìm kiếm và phân trang
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số lượng người dùng trên mỗi trang
  const [sortBy, setSortBy] = useState("");
  // Lọc người dùng theo tìm kiếm
  const filteredProducts = products
    ?.filter((product) =>
      product.name?.toLowerCase().includes(search.toLowerCase())
    )
    ?.sort((a, b) => {
      if (sortBy === "price") {
        return b.price - a.price; // Sắp xếp theo giá giảm dần
      } else if (sortBy === "date") {
        return new Date(b.createdAt) - new Date(a.createdAt); // Sắp xếp theo ngày mới nhất
      } else if (sortBy === "date-ago") {
        return new Date(a.createdAt) - new Date(b.createdAt); // Sắp xếp theo ngày thap nhat
      } else if (sortBy === "a-z") {
        return a.name.localeCompare(b.name); // Sắp xếp tên từ A-Z
      } else if (sortBy === "z-a") {
        return b.name.localeCompare(a.name); // Sắp xếp tên từ Z-A
      }
      return 0; // Không sắp xếp nếu không chọn bộ lọc
    });

  // Tính toán tổng số trang và dữ liệu hiện tại
  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  };

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
      <h1 className="text-3xl font-bold text-white font-arya mt-6 mb-4">
        Tất Cả Sản Phẩm ({products?.length})
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
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="bg-gray-300 px-2 py-2 font-semibold text-gray-900 focus:outline-none"
              >
                <option value="">Mặc định</option>
                <option value="price">Giá cao nhất</option>
                <option value="date">Ngày mới nhất</option>
                <option value="date-ago">Ngày cũ nhất</option>
                <option value="a-z">Tên: A-Z</option>
                <option value="z-a">Tên: Z-A</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {currentProducts?.map((product) => (
              <div
                key={product._id}
                className="px-4 py-2 bg-primary-bgthin rounded-md flex gap-4 items-center"
              >
                <div className="w-[250px] h-[150px]">
                  <img
                    src={product.image}
                    className="w-full h-[150px] rounded-sm object-cover object-center "
                    alt={product.name}
                  />
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-start gap-4">
                    <h1 className="text-white text-[16px] font-semibold">
                      {product.name.length > 24
                        ? `${product.name.substring(0, 24)}...`
                        : product.name}
                    </h1>
                    <p className="text-primary-light text-sm">
                      {moment(product.createdAt).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <p className="text-primary-light text-sm min-h-10 mt-2">
                    {product.description.length > 140
                      ? `${product.description.substring(0, 140)}...`
                      : product.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <Link
                      to={`/admin/products/update/${product._id}`}
                      className="rounded-sm text-[16px] font-light text-white bg-primary-blue px-2 py-1  flex items-center"
                    >
                      Cập Nhật
                      <MdOutlineArrowRightAlt size={26} />
                    </Link>
                    <p className="text-white text-lg font-normal">
                      {numeral(product.price).format("0,0").replace(/,/g, ".")}₫
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {currentProducts.length === 0 && (
            <p className="text-center w-full text-white px-4 font-bold py-3 text-xl">
              Không có sản phẩm
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

export default Products;
