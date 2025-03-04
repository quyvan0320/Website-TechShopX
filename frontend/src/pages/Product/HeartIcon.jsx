import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavoritesLocalStorage,
  getFavoritesLocalStorage,
} from "../../utils/localstorage";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";


const HearIcon = ({ product, layout }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorites = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesLocalstorage = getFavoritesLocalStorage();
    dispatch(setFavorites(favoritesLocalstorage));
  }, []);

  const toggleFavorite = () => {
    if (isFavorites) {
      dispatch(removeFromFavorites(product));
      removeFromFavorites(product._id);
    } else {
      dispatch(addToFavorites(product));
      addToFavoritesLocalStorage(product);
    }
  };
  return (
    <div onClick={toggleFavorite} className={layout}>
      {isFavorites ? (
        <FaHeart className="text-white" size={22} />
      ) : (
        <FaRegHeart className="text-white" size={22} />
      )}
    </div>
  );
};

export default HearIcon;
