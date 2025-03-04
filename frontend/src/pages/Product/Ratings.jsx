import React from "react";
import { RiStarSFill, RiStarLine, RiStarHalfSLine  } from "react-icons/ri";


const Ratings = ({ value, text, color, size }) => {
  const stars = [...Array(5)].map((_, i) =>
    value >= i + 1 ? (
      <RiStarSFill key={i} className={`text-${color}`} size={size} />
    ) : value >= i + 0.5 ? (
      <RiStarHalfSLine key={i} className={`text-${color}`} size={size} />
    ) : (
      <RiStarLine key={i} className={`text-${color}`} size={size} />
    )
  );
  return (
    <div className="flex items-center text-white gap-1">
      {text && <span className={`text-${color} mr-2`}>{text}</span>}
    {stars}
    </div>
  );
};

export default Ratings;
