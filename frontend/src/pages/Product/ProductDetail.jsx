import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddProductReviewsMutation,
  useFetchProductByIdQuery,
  useFetchProductQueryQuery,
} from "../../redux/api/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import BreakCrumb from "../../components/BreakCrumb";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import numeral from "numeral";
import HeartIcon from "./HeartIcon";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import Ratings from "./Ratings";
import { PiStar, PiStarFill } from "react-icons/pi";
import ProductTabs from "./ProductTabs";
import { toast } from "react-toastify";
import { RiStarSFill } from "react-icons/ri";
import ProductSlider from "./ProductSlider";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { isRequire } from "../../utils/validation";
dayjs.extend(relativeTime);
dayjs.locale("vi");
const ProductDetail = () => {
  const mastercard = "/mastercard.png";
  const discover = "/discover.png";
  const momo = "/momo.webp";
  const paypal = "/paypal.png";
  const visa = "/visa.png";
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useFetchProductByIdQuery(productId);
  const [addReviews, { isLoading: loadingReview }] =
    useAddProductReviewsMutation();
  const { keyword } = useParams();
  const { data } = useFetchProductQueryQuery({ keyword });
  console.log(data);
    const validateInputs = () => {
      const commentError = isRequire(comment, "Nhập nội dung đánh giá");
      if (commentError) {
        toast.error(commentError);
        return false;
      }
      return true;
    };
  
  const submitHandle = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    try {
      await addReviews({ productId, rating: Number(rating), comment }).unwrap();
      refetch();
      toast.success("Đanh giá sản phẩm thành công");
      setComment("");
      setRating(1);
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };
  console.log(product);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    if (product.countInStock < 1) {
      toast.error("Sản phẩm đã hết hàng!");
      return; // Dừng hàm nếu hết hàng
    }
  
    // Nếu còn hàng, tiếp tục thêm vào giỏ
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  
  return (
    <>
      <BreakCrumb heading={product?.name} />
      <div className="py-12 bg-primary-dark">
        <div className="container mx-auto max-w-screen-xl min-h-[80vh]">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="error">
              {error?.data?.error || error.message}
            </Message>
          ) : (
            <>
              <div className="grid grid-cols-[1.7fr_2.3fr] gap-8">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[500px] object-cover object-center"
                  />
                  {product.countInStock < 1 && (
                    <div className="font-bold text-red-500 absolute top-6 left-0 font-arya text-xl -rotate-45">
                      Hết Hàng
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white font-arya ">
                    {product.name}
                  </h1>
                  <div className="mt-3">
                    <Ratings
                      size={26}
                      value={product.rating}
                      text={`(${product.numReviews}) Lượt Đánh Giá`}
                    />
                  </div>
                  <p className="text-lg font-bold text-white mt-4">
                    {numeral(product.price).format("0,0").replace(/,/g, ".")}₫
                  </p>
                  <p className="text-sm text-white font-medium mt-2">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-4 border-b pb-6 border-primary-light/50 mt-6">
                    {product.countInStock > 0 && (
                      <div className="flex items-center ">
                        <button
                          onClick={() =>
                            setQty((prev) => (prev > 1 ? prev - 1 : prev))
                          }
                          className="bg-white text-primary-bgthin px-3 py-2 h-12 font-bold text-lg"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={qty}
                          readOnly
                          className="bg-white text-primary-bgthin px-3 py-2 font-bold text-lg text-center w-14 h-12 focus:outline-none"
                        />
                        <button
                          onClick={() =>
                            setQty((prev) =>
                              prev < product.countInStock ? prev + 1 : prev
                            )
                          }
                          className="bg-white text-primary-bgthin px-3 py-2 h-12 font-bold text-lg"
                        >
                          +
                        </button>
                      </div>
                    )}
                    <button
                      onClick={addToCartHandler}
                      className="btn-hover-effect h-12"
                    >
                      <span className="relative z-10">Thêm Vào Giỏ Hàng</span>
                    </button>
                    <HeartIcon
                      product={product}
                      layout={
                        "p-3 border border-white h-12 hover:border-primary-blue hover:bg-primary-blue transition-all-ease "
                      }
                    />
                  </div>
                  <div className=" text-white grid grid-cols-2 gap-6 justify-between mt-6">
                    <p className="flex items-center gap-2 col-span-1 font-medium">
                      THƯƠNG HIỆU:
                      <span className="text-sm font-normal">
                        {product.brand}
                      </span>
                    </p>
                    <p className="flex items-center font-medium gap-2 col-span-1">
                      ĐÃ THÊM:
                      <span className="text-sm font-normal">
                        {dayjs(product.createdAt).fromNow()}
                      </span>
                    </p>
                    <p className="flex items-center font-medium gap-2 ">
                      ĐÁNH GIÁ:
                      <span className="text-sm font-normal flex items-center gap-1">
                        {Math.ceil(product.rating)}
                        <RiStarSFill size={18} />
                      </span>
                    </p>
                    <p className="flex items-center font-medium gap-2 ">
                      DANH MỤC:
                      <span className="text-sm font-normal">
                        {product.category.name}
                      </span>
                    </p>
                    <p className="flex items-center font-medium gap-2 ">
                      ĐÃ MUA:
                      <span className="text-sm font-normal">
                        {product.quantity}
                      </span>
                    </p>
                    <p className="flex items-center font-medium gap-2 ">
                      CÓ SẴN:
                      {product.countInStock > 0 ? (
                        <span className="text-sm font-normal text-green-600">
                          {product.countInStock}
                        </span>
                      ) : (
                        <span className="text-sm font-normal text-red-500">
                          Hết Hàng
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="w-full bg-primary-bgthin flex-col flex items-center justify-center p-4 mt-4">
                    <p className="font-medium text-white text-sm">
                      Phương thức thanh toán an toàn & bảo mật
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <div className="p-1 bg-white rounded-md flex items-center justify-center">
                        <img
                          src={mastercard}
                          className="w-10 h-5 object-cover object-center"
                        />
                      </div>
                      <div className="p-1 bg-white rounded-md flex items-center justify-center">
                        <img
                          src={discover}
                          className="w-10 h-5 object-cover object-center"
                        />
                      </div>
                      <div className="p-1 bg-white rounded-md flex items-center justify-center">
                        <img
                          src={paypal}
                          className="w-10 h-5 object-contain object-center"
                        />
                      </div>
                      <div className="p-1 bg-white rounded-md flex items-center justify-center">
                        <img
                          src={momo}
                          className="w-10 h-5 object-contain object-center"
                        />
                      </div>
                      <div className="p-1 bg-white rounded-md flex items-center justify-center">
                        <img
                          src={visa}
                          className="w-10 h-5 object-contain object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <ProductTabs
                  loadingReview={loadingReview}
                  userInfo={userInfo}
                  submitHandle={submitHandle}
                  rating={rating}
                  setRating={setRating}
                  comment={comment}
                  setComment={setComment}
                  product={product}
                />
              </div>
              <div className="mt-10">
                <h2 className=" font-arya text-white text-4xl mb-2">
                  Sản Phẩm Tương Tự
                </h2>
                <ProductSlider products={data?.products} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
