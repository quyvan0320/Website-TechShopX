import React from "react";
import { useParams } from "react-router-dom";
import {
  useFetchNewProductsQuery,
  useFetchProductQueryQuery,
} from "../redux/api/productApiSlice";
import ProductFutured from "../components/ProductFutured";
import ProductsItem from "./Product/ProductsItem";
import ProductSlider from "./Product/ProductSlider";
import { FaHandHoldingHeart, FaLightbulb } from "react-icons/fa";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";

const Home = () => {
  const { keyword } = useParams();
  const { data } = useFetchProductQueryQuery({ keyword });
  // load sản phẩm từ hook
  const { data: newProduct } = useFetchNewProductsQuery();
  console.log(newProduct);
  return (
    <>
      <div className="pb-12 bg-primary-dark px-4 lg:px-0">
        <div className="container max-w-screen-xl mx-auto min-h-[80vh] ">
          {!keyword ? <ProductFutured /> : null}
          <h2 className=" font-arya text-white text-2xl md:text-4xl mt-6">
            Sản Phẩm Xu Hướng
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
            {data?.products?.map((product) => (
              <div key={product._id}>
                <ProductsItem product={product} />
              </div>
            ))}
          </div>
            <div className="">

          <h2 className=" font-arya text-white text-2xl md:text-4xl mt-6 mb-2">
            Sản Phẩm Mới Nhất
          </h2>
          <ProductSlider tagNew={"Mới"} products={newProduct} />
            </div>

          <div className="mt-14">
            <h2 className=" font-arya text-white text-3xl text-center">
              Tại Sao Nên Chọn TechShopX
            </h2>
            <p className=" font-arya text-primary-light text-lg text-center">
              TechShopX - Điểm đến hàng đầu cho mọi tín đồ công nghệ!
            </p>
            <div className="flex-col space-y-6  md:space-y-0 flex md:flex-row justify-around gap-8 mt-4">
              <div className="flex flex-col justify-center items-center bg-primary-bgthin border border-primary-light p-4 gap-2">
                <p className="font-bold text-4xl uppercase border-2  text-primary-dark bg-white w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <FaHandHoldingHeart />
                </p>
                <h2 className=" font-bold text-white text-xl text-center">
                  Cam kết
                </h2>
                <p className=" font-medium text-primary-light text-sm text-center">
                  Cam kết 100% sản phẩm chính hãng, chất lượng đảm bảo Hỗ trợ
                  tận tâm, giao hàng nhanh chóng. Đổi trả linh hoạt trong 30
                  ngày.
                </p>
              </div>

              <div className="flex flex-col justify-center items-center bg-primary-bgthin border border-primary-light p-4 gap-2">
                <p className="font-bold text-4xl uppercase border-2  text-primary-dark bg-white w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <TbRosetteDiscountCheckFilled />
                </p>
                <h2 className=" font-bold text-white text-xl text-center">
                  Ưu Đãi
                </h2>
                <p className=" font-medium text-primary-light text-sm text-center">
                  Siêu sale mỗi ngày - Giá sốc không tưởng. Giảm ngay 10% cho
                  đơn hàng đầu tiên. Miễn phí giao hàng với đơn từ 500K.
                </p>
              </div>

              <div className="flex flex-col justify-center items-center bg-primary-bgthin border border-primary-light p-4 gap-2">
                <p className="font-bold text-4xl uppercase border-2  text-primary-dark bg-white w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  <FaLightbulb />
                </p>
                <h2 className=" font-bold text-white text-xl text-center">
                  Sự Khác Biệt
                </h2>
                <p className=" font-medium text-primary-light text-sm text-center">
                  Sản phẩm đa dạng. Từ điện thoại, laptop đến phụ kiện hiện đại.
                  Cập nhật xu hướng công nghệ mới nhất.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
