import React from "react";

const getMessageStyle = (variant) => {
  switch (variant) {
    case "error":
      return "text-red-600";
    case "success":
      return "text-green-600";
    default:
      return "text-blue-600";
  }
};

const Message = ({ variant, children }) => {
  return (
    <div className={`text-center text-xl font-bold ${getMessageStyle(variant)}`}>
      {children}
    </div>
  );
};

export default Message;
