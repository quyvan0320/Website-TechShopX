import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreakCrumb from "../../components/BreakCrumb";
import numeral from "numeral";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import {
  clearFavoritesLocalStorage,
  getFavoritesLocalStorage,
  removeFavoriteLocalStorage,
} from "../../utils/localstorage";
import {
  clearFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";

const Favorite = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];

  // Load favorites từ localStorage vào Redux store khi component mount
  useEffect(() => {
    const favoritesLocalstorage = getFavoritesLocalStorage();
    dispatch(setFavorites(favoritesLocalstorage));
  }, [dispatch]);

  // Hàm xóa sản phẩm yêu thích
  const removeFavorite = (productId) => {
    dispatch(removeFromFavorites({ _id: productId })); // Xóa khỏi Redux state
    removeFavoriteLocalStorage(productId); // Xóa khỏi localStorage
  };

  const handleClearFavorites = () => {
    dispatch(clearFavorites()); // Xóa trong Redux state
    clearFavoritesLocalStorage(); // Xóa trong localStorage
  };

  return (
    <>
      <BreakCrumb heading={"Yêu Thích"} />
      <div className="p-4 md:py-12 bg-primary-dark">
        <div className="mx-auto container max-w-screen-xl min-h-[80vh]">
          <h1 className="text-4xl font-bold text-white font-arya mb-6 text-center">
            Yêu Thích ({favorites?.length})
          </h1>

          <div className="hidden md:grid grid-cols-4">
            <div className="bg-primary-bgthin text-center font-bold text-lg py-2 col-span-1 text-primary-light">
              Sản Phẩm
            </div>
            <div className="bg-primary-bgthin text-center font-bold text-lg py-2 col-span-1 border-l text-primary-light">
              Mô Tả
            </div>
            <div className="bg-primary-bgthin text-center font-bold text-lg py-2 col-span-1 text-primary-light border-l border-r">
              Nút Giỏ Hàng
            </div>
            <div className="bg-primary-bgthin text-center font-bold text-lg py-2 col-span-1 text-primary-light">
              Xóa
            </div>
          </div>
          {favorites.length > 0 ? (
            favorites?.map((favorite) => (
              <div
                key={favorite._id}
                className="flex flex-col md:grid md:grid-cols-4 items-center border-b border-primary-border"
              >
                <Link
                  className="col-span-1 md:py-6 px-4"
                  to={`/product/${favorite._id}`}
                >
                  <img
                    src={favorite.image}
                    alt={favorite.name}
                    className="w-[250px] h-[150px] object-cover object-center"
                  />
                </Link>
                <div className="col-span-1 text-white md:py-6 px-4 text-center space-y-3">
                  <p className="text-sm">{favorite.brand}</p>
                  <p className="text-xl font-arya">{favorite.name}</p>
                  <p className="font-bold text-primary-red">
                    {numeral(favorite.price).format("0,0").replace(/,/g, ".")}₫
                  </p>
                </div>
                <div className="col-span-1 text-white py-2 md:py-6 px-4 text-center">
                  <Link to="/cart">
                    <button className="btn-hover-effect">
                      <span className="relative z-10">Thêm Vào Giỏ Hàng</span>
                    </button>
                  </Link>
                </div>
                <div className="col-span-1 text-white py-6 px-4 text-center">
                  <button onClick={() => removeFavorite(favorite._id)}>
                    <GoTrash className="text-primary-red" size={26} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>
              {" "}
              <h1 className="text-4xl font-bold text-white font-arya mb-6 text-center mt-8">
                Yêu Thích Rỗng
              </h1>
            </div>
          )}
          {favorites.length > 0 && (
            <div className="flex items-center justify-center w-full mt-8">
              <button
                className="btn-hover-effect"
                onClick={() => handleClearFavorites()}
              >
                <span className="relative z-10">Xóa Tất Cả</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorite;
