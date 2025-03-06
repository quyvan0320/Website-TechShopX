import React from "react";
import { useSelector } from "react-redux";

const FavoriteCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoritesCount = favorites.length;
  return (
    <>
      {favoritesCount > 0 && (
        <div className="absolute -top-2 -right-2 md:-top-1 md:-right-1 w-[18px] h-[18px] text-center text-[12px] bg-primary-blue text-white rounded-full">
            {favoritesCount}
        </div>
      )}
    </>
  );
};

export default FavoriteCount;
