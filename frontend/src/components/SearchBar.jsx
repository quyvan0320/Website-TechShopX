import React, { useState } from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useFetchProductByQueryQuery } from "../redux/api/productApiSlice";
import { Link } from "react-router-dom";

const SearchBar = ({ onClose }) => {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  // Gọi API mỗi khi page hoặc keyword thay đổi
  const { data, error, isLoading } = useFetchProductByQueryQuery({
    keyword,
    page,
  });

  const nextPage = () => {
    if (data && data.hasMore) {
      // Kiểm tra xem 'data' và 'hasMore' có tồn tại không
      setPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    setPage(1); // Reset page khi thay đổi từ khóa
  };

  return (
    <div className="fixed  top-0 left-0 w-full h-[70vh] bg-white z-50 flex flex-col items-center p-8">
      <button onClick={onClose} className="absolute top-5 right-5 text-3xl">
        ✖
      </button>
      <h2 className="text-2xl font-semibold mb-5">Nhập để tìm kiếm sản phẩm</h2>

      <div className="relative w-3/4 max-w-lg">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={keyword}
          onChange={handleSearch}
          className="w-full p-4 border-b-2 border-gray-400 focus:outline-none text-lg"
        />
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500 mt-3">Không tìm thấy sản phẩm.</p>}

      {/* Hiển thị sản phẩm khi có kết quả tìm kiếm */}
      <div className="mt-5 w-full max-w-lg">
        <div>
          {data && data.products.length > 0 ? (
            <ul className="space-y-1">
              {data.products.map((product) => (
                <li key={product._id}>
                  <Link to={`/product/${product._id}`}>
                  <h3>{product.name}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có sản phẩm</p>
          )}
        </div>

        <div className="flex justify-between items-center mt-2">
          <button onClick={prevPage} disabled={page <= 1} className="px-4 py-2 font-bold text-white bg-primary-blue cursor-pointer">
            Previous
          </button>
          <button onClick={nextPage} disabled={!data || !data.hasMore} className="px-4 py-2 font-bold text-white bg-primary-blue cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
