import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-primary-dark/50 w-screen h-screen z-50">
        <div className="absolute top-1/2 left-1/2 bg-primary-bgthin p-4 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2">
          <button className="flex justify-end w-full mb-2" onClick={onClose}>
            <IoCloseOutline size={22} className="text-white" />
          </button>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
