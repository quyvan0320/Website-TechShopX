import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 w-screen h-screen bg-primary-dark/50 flex justify-center items-center">
      <div className="animate-spin w-20 h-20 border-t-4 border-primary-light rounded-full"></div>
    </div>
  );
};

export default Loader;
