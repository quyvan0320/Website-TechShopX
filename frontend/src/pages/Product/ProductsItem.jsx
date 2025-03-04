import numeral from "numeral";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Ratings from "./Ratings";
import HeartIcon from "./HeartIcon";


const ProductsItem = ({ product }) => {
  return (
    <div className="p-4 bg-primary-bgthin relative group space-y-2">
      <Link to={`/product/${product._id}`} className="relative">
        <img
          src={product.image}
          className="w-full h-[200px] object-center object-cover "
          alt={product.name}
        />
      </Link>

      <p className="text-[15px] text-white font-bold mt-2 ">
        {product.name.length > 28
          ? `${product.name.substring(0, 28)}...`
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
    </div>
  );
};

export default ProductsItem;
