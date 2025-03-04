import React from "react";
import numeral from "numeral";
import { Link } from "react-router-dom";
const SmallProducts = ({ tagTop, product }) => {
  return (
    <Link to={`/product/${product._id}`} className="relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-[30rem] h-[14rem] object-center object-cover "
      />

      <p className="absolute bottom-0 text-primary-light text-[1rem] w-full bg-primary-dark/50 min-h-10 p-1">
        {product.name}
      </p>
      <p className="absolute top-2 right-2 text-sm text-white text-[1rem] bg-primary-blue p-1">
        {numeral(product.price).format("0,0").replace(/,/g, ".")}₫
      </p>
      {tagTop && (
              <p className="absolute top-2 left-2 text-sm text-white text-[1rem] bg-primary-blue p-1">
                {tagTop}
              </p>
            )}
    </Link>
  );
};

export default SmallProducts;
