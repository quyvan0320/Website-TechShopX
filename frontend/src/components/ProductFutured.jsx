import React from "react";
import { useFetchTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProducts from "../pages/Product/SmallProducts";
import CarouselProduct from "../pages/Product/CarouselProduct";
import Message from '../components/Message'
const ProductFutured = () => {
  const { data, refetch, isLoading, error } = useFetchTopProductsQuery();
  console.log(data);
  return (
    <div className="container max-w-screen-xl mx-auto h-full pt-2">
    
      {isLoading ? (
        <Loader />
      ) :
       error ? (
        <Message variant="error">{error?.data?.error || error.message}</Message>
      ) : (
        <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-4">
                {data.map(product => 
                    <div key={product._id}>
                        <SmallProducts tagTop={"TOP"} product={product}/>
                    </div>
                )}
            </div>
            <div className="row-span-2">
                <CarouselProduct/>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProductFutured;
