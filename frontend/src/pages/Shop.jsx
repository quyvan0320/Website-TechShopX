import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchAllCategoriesQuery } from "../redux/api/categoryApiSlice";
import { useFetchFilteredProductsQuery } from "../redux/api/productApiSlice";
import {
  setCategories,
  setChecked,
  setProducts,
} from "../redux/features/shop/shopSlice";
import BreakCrumb from "../components/BreakCrumb";
import { IoFilterOutline } from "react-icons/io5";
import Loader from "../components/Loader";
import ProductsItem from "./Product/ProductsItem";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  const categoriesQuery = useFetchAllCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState(0);
  const [sortOption, setSortOption] = useState("newest"); // State lưu lựa chọn sắp xếp
  const filteredProductsQuery = useFetchFilteredProductsQuery({
    checked,
    radio,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const handleSort = (products) => {
    switch (sortOption) {
      case "newest":
        return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "oldest":
        return [...products].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "low-to-high":
        return [...products].sort((a, b) => a.price - b.price);
      case "high-to-low":
        return [...products].sort((a, b) => b.price - a.price);
      case "a-to-z":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "z-to-a":
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  };

  const currentProducts = handleSort(products).slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
      const filteredProducts = filteredProductsQuery.data.filter((product) => {
        return (
          product.price.toString().includes(priceFilter) ||
          product.price === parseInt(priceFilter, 10)
        );
      });
      dispatch(setProducts(filteredProducts));
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <BreakCrumb heading={"Cửa Hàng"} />
      <div className="py-12 bg-primary-dark">
        <div className="mx-auto container max-w-screen-xl min-h-[80vh]">
          <div className="grid grid-cols-[1.5fr_4.5fr] gap-6">
            {/* Sidebar */}
            <div className="border border-primary-light">
              {/* Bộ lọc */}
              <div className="flex items-center gap-2 text-white p-3">
                <IoFilterOutline size={30} />
                <span className="font-bold text-xl">BỘ LỌC</span>
              </div>
              {/* Danh mục */}
              <div className=" text-white p-3 border-t border-primary-light">
                <div className="bg-primary-bgthin px-2 py-3 mt-1">
                  <p className="font-medium">DANH MỤC</p>
                </div>
                <div className="mt-2">
                  {categories?.map((c) => (
                    <div key={c._id} className="">
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            handleCheck(e.target.checked, c._id)
                          }
                          className="peer h-5 w-5 cursor-pointer"
                        />
                        <label className="text-sm font-medium text-primary-light">
                          {c.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Thương hiệu */}
              <div className=" text-white p-3 border-t border-primary-light">
                <div className="bg-primary-bgthin px-2 py-3 mt-1">
                  <p className="font-medium">THƯƠNG HIỆU</p>
                </div>
                <div className="mt-2">
                  {uniqueBrands?.map((brand) => (
                    <div key={brand} className="">
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          id={brand}
                          name="brand"
                          onChange={() => handleBrandClick(brand)}
                          type="radio"
                        />
                        <label className="text-sm font-medium text-primary-light">
                          {brand}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Giá */}
              <div className=" text-white p-3 border-t border-primary-light">
                <div className="bg-primary-bgthin px-2 py-3 mt-1">
                  <p className="font-medium">MỨC GIÁ</p>
                </div>
                <input
                  type="number"
                  value={priceFilter}
                  onChange={handlePriceChange}
                  placeholder="Giá Tiền"
                  className="mt-4 w-full py-2 text-primary-dark px-2"
                />
                <button
                  className="btn-hover-effect mt-4 bg-primary-bgthin"
                  onClick={() => window.location.reload()}
                >
                  Đặt Lại
                </button>
              </div>
            </div>

            {/* Sản phẩm */}
            <div>
              {/* Sắp xếp */}
              <div className="flex items-center justify-between text-white p-3 border">
                <span className="font-bold text-xl">{currentProducts?.length} sản phẩm có sẵn</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="text-black rounded"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="low-to-high">Giá: Thấp đến Cao</option>
                  <option value="high-to-low">Giá: Cao đến Thấp</option>
                  <option value="a-to-z">Tên: A → Z</option>
                  <option value="z-to-a">Tên: Z → A</option>
                </select>
              </div>

              {filteredProductsQuery.isLoading ? (
                <Loader />
              ) : currentProducts?.length > 0 ? (
                <div className="grid grid-cols-3 gap-8 mt-4">
                  {currentProducts.map((p) => (
                    <div key={p._id}>
                      <ProductsItem product={p} />
                    </div>
                  ))}
                </div>
              ) : (
                <h1 className="text-4xl font-bold text-white text-center mt-8">
                  Không có sản phẩm trong bộ lọc
                </h1>
              )}

              <div className="mt-4 flex justify-center">
                {Array.from(
                  { length: Math.ceil(products.length / productsPerPage) },
                  (_, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 mx-1 rounded ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
