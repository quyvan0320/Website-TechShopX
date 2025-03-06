import React from "react";

import { Link } from "react-router-dom";
const BreakCrumb = ({ heading }) => {
  const bgBreakCrumb = "/common-bg.png";

  return (
    <div
      className="bg-cover bg-center  py-20 w-full px-4 lg:px-0"
      style={{ backgroundImage: `url(${bgBreakCrumb})` }}
    >
      <div className="container max-w-screen-xl mx-auto  w-full">
        <div className="  w-full">
          <div className="flex items-center gap-2 md:gap-4 text-white font-medium text-[1rem] mb-6  w-full">
            <Link to="/" className="text-primary-light">
              Trang Chủ
            </Link>
            <span>/</span>
            <span>{heading}</span>
          </div>
          <h1 className="h-full w-full text-white font-arya text-xl md:text-4xl">{heading}</h1>
        </div>
      </div>
    </div>
  );
};

export default BreakCrumb;
