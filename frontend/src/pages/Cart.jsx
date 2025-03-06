import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BreakCrumb from "../components/BreakCrumb";
import numeral from "numeral";
import { GoTrash } from "react-icons/go";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = cart;
  console.log(cartItems);
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate("/login?redirect=/shipping");
    } else {
      navigate("/shipping");
    }
  };
  return (
    <>
      <BreakCrumb heading={"Giỏ hàng Của Bạn"} />
      <div className="p-4 md:py-12 bg-primary-dark">
        <div className="mx-auto container max-w-screen-xl min-h-[80vh]  ">
          <div className="grid grid-cols-1 md:grid-cols-6 md:gap-8">
            <div className="col-span-4">
              <div className="hidden md:grid md:grid-cols-[1fr_1.5fr_1fr_1fr]">
                <div className="bg-primary-bgthin text-left px-2  font-bold text-lg py-2  text-primary-light">
                  Hình Ảnh
                </div>
                <div className="bg-primary-bgthin text-left px-2 font-bold text-lg py-2   text-primary-light">
                  Tên
                </div>
                <div className="bg-primary-bgthin text-left px-2  font-bold text-lg py-2  text-primary-light ">
                  Số Lượng
                </div>
                <div className="bg-primary-bgthin text-right px-2  font-bold text-lg py-2  text-primary-light">
                  Tổng
                </div>
              </div>
              {cartItems.length > 0 ? (
                cartItems?.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col md:grid md:grid-cols-[1fr_1.5fr_1fr_1fr] items-center  py-2 border-b border-primary-border"
                  >
                    <Link to={`/product/${item._id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[150px] h-[150px] object-cover object-center"
                      />
                    </Link>
                    <div className=" text-white text-center py-2  md:py-6 space-y-3">
                      <p className="text-xl font-arya">{item.name}</p>
                      <p className="font-bold text-primary-red">
                        {numeral(item.price).format("0,0").replace(/,/g, ".")}₫
                      </p>
                    </div>
                    <div className=" text-white text-center">
                      {item.countInStock > 0 && (
                        <div className="flex items-center flex-col md:flex-row gap-1">
                          <div className="flex  items-center">
                            {/* Nút giảm số lượng */}
                            <button
                              onClick={() => {
                                const newQty = item.qty > 1 ? item.qty - 1 : 1;
                                addToCartHandler(item, newQty); // Cập nhật Redux store
                              }}
                              className="bg-white text-primary-bgthin px-3 py-2 h-12 font-bold text-lg"
                            >
                              -
                            </button>

                            {/* Hiển thị số lượng */}
                            <input
                              type="text"
                              value={item.qty} // Sử dụng item.qty từ Redux store
                              readOnly
                              className="bg-white text-primary-bgthin px-3 py-2 font-bold text-lg text-center w-14 h-12 focus:outline-none"
                            />

                            {/* Nút tăng số lượng */}
                            <button
                              onClick={() => {
                                const newQty =
                                  item.qty < item.countInStock
                                    ? item.qty + 1
                                    : item.countInStock;
                                addToCartHandler(item, newQty); // Cập nhật Redux store
                              }}
                              className="bg-white text-primary-bgthin px-3 py-2 h-12 font-bold text-lg"
                            >
                              +
                            </button>
                          </div>
                          <div className=" text-white px-4 text-center">
                            <button
                              onClick={() => removeFromCartHandler(item._id)}
                            >
                              <GoTrash className="text-primary-red mt-1 md:mt-0" size={24} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-center md:text-right font-bold  mt-2 md:mt-0 text-white">
                      {numeral(item.price * item.qty)
                        .format("0,0")
                        .replace(/,/g, ".")}
                      ₫
                    </p>
                  </div>
                ))
              ) : (
                <div>
                  {" "}
                  <h1 className="text-4xl font-bold text-white font-arya mb-6 text-center mt-8">
                    Giỏ Hàng Rỗng
                  </h1>
                </div>
              )}
            </div>

            <div className="grid-cols-1 md:col-span-2 bg-primary-bgthin lg:max-h-[200px] p-4 mt-4 md:mt-0">
              <div className="flex justify-between items-center ">
                <p className="text-white font-medium">
                  Sản Phẩm ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ):
                </p>
                <p className="text-white font-medium">
                  {numeral(
                    cartItems.reduce(
                      (acc, item) => acc + item.qty * item.price,
                      0
                    )
                  )
                    .format("0,0")
                    .replace(/,/g, ".")}
                  ₫
                </p>
              </div>
              <p className="text-sm text-primary-light mt-2 ">
                Thuế và phí vận chuyển được tính khi thanh toán
              </p>
              <button
                disabled={cartItems.length === 0}
                className="btn-hover-effect w-full mt-4"
                onClick={checkoutHandler}
              >
                <span className="relative z-10">Thanh Toán</span>
              </button>
              <Link to={"/shop"}>
                <button className="btn-hover-effect w-full mt-4 bg-primary-bgthin">
                  <span className="relative z-10">Tiếp Tục Mua Sắm</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
