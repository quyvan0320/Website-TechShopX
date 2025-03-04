import React, { useRef, useState } from "react";
import Slider from "react-slick";
import HeartIcon from "./HeartIcon";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import numeral from "numeral";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductSlider = ({ tagNew, products }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };
  const sliderRef = useRef(null);
  return (
    <div className="relative">
      {/* Nút "Previous" */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute top-1/2 left-0 z-10 px-2 -translate-y-1/2 btn-hover-effect"
      >
        <span className="relative z-10">
          <IoIosArrowBack size={24} />
        </span>
      </button>
      <Slider {...settings} ref={sliderRef}>
        {products?.map((product, index) => (
          <div
            key={product._id}
            className="p-4 bg-primary-bgthin relative group space-y-2"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                className="w-full h-[200px] object-center object-cover "
                alt={product.name}
              />
            </Link>
            <p className="text-[15px] text-white font-bold mt-2 ">
              {product.name.length > 30
                ? `${product.name.substring(0, 30)}...`
                : product.name}
            </p>

            <Ratings value={product.rating} color={`primary-light`} size={16} />
            <p className="text-[1rem] text-primary-red font-bold">
              {numeral(product.price).format("0,0").replace(/,/g, ".")}₫
            </p>
            <HeartIcon
              product={product}
              layout={
                "absolute right-7 top-4 p-1 bg-primary-blue/50 rounded-sm shadow-lg opacity-0 translate-y-2 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-in-out"
              }
            />

            {tagNew && (
              <p className="absolute left-7 top-4 text-sm text-white text-[1rem] bg-primary-blue p-1">
                {tagNew}
              </p>
            )}
          </div>
        ))}
      </Slider>
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute top-1/2 right-0 z-10 px-2 -translate-y-1/2 btn-hover-effect"
      >
        <span className="relative z-10">
          <IoIosArrowForward size={24} />
        </span>
      </button>
    </div>
  );
};

export default ProductSlider;
