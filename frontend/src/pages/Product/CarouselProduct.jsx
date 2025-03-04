import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchTopProductsQuery } from "../../redux/api/productApiSlice";
import numeral from "numeral";
import { PiShoppingCartSimpleThin, PiStarThin, PiStorefrontThin, PiTimerThin } from "react-icons/pi";
import { CiBoxes } from "react-icons/ci";
import { SlLike } from "react-icons/sl";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; 
import "dayjs/locale/vi"; 

dayjs.extend(relativeTime); 
dayjs.locale("vi"); 
const CarouselProduct = () => {
  const { data, refetch, isLoading, error } = useFetchTopProductsQuery();
  console.log(data);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
  };
 
  return (
    <Slider {...settings} className="w-full">
      {data.map((product) => (
        <div key={product._id} className="outline-none overflow-hidden">
          <img
            src={product.image}
            className="w-full h-[20rem] object-cover object-center transition-transform duration-500 ease-in-out"
            alt={product.name}
          />
          <div className="mt-2 grid grid-cols-2 gap-8">
            <div className="text-white space-y-1">
              <p className="font-arya text-lg">{product.name}</p>
              <p className="text-primary-blue font-bold">
                {numeral(product.price).format("0,0").replace(/,/g, ".")}₫
              </p>
              <p className="text-sm ">
                {product.description.length > 140
                  ? `${product.description.substring(0, 140)}...`
                  : product.description}
              </p>
            </div>
            <div className=" text-white grid grid-cols-2 gap-6 justify-between">
              <p className="flex items-center gap-2 col-span-1">
                <PiStorefrontThin size={26} />
                {product.brand}
              </p>
              <p className="flex items-center text-[12.5px] gap-2 col-span-1">
                <PiTimerThin size={26} />
                {dayjs(product.createdAt).fromNow()}
              </p>
              <p className="flex items-center gap-2 ">
              <PiStarThin size={26} />
                {Math.ceil(product.rating)}
              </p>
              <p className="flex items-center gap-2 ">
              <SlLike size={26} />
                {product.numReviews}
              </p>
              <p className="flex items-center gap-2 ">
              <PiShoppingCartSimpleThin size={26} />

                {product.quantity}
              </p>
              <p className="flex items-center gap-2 ">
                <CiBoxes size={26} />
                {product.countInStock > 0 ? (
                        <span className="">
                          {product.countInStock}
                        </span>
                      ) : (
                        <span className="text-sm font-normal text-red-500">
                          Hết Hàng
                        </span>
                      )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CarouselProduct;
  