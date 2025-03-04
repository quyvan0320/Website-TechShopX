import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const navAdminMenu = [
    { path: "/admin/dashboard", title: "Thống Kê" },
    { path: "/admin/users", title: "Quản Lý Người Dùng" },
    { path: "/admin/categories", title: "Quản Lý Danh Mục" },
    { path: "/admin/products", title: "Danh Sách Sản Phẩm" },
    { path: "/admin/products/create", title: "Tạo Sản Phẩm" },
    { path: "/admin/orders", title: "Quản Lý Đơn Hàng" },
  ];
  return (
    <>
      <button
        onClick={toggleOpen}
        className="text-white absolute top-0 right-0 p-2 rounded-sm bg-primary-bgthin"
      >
        {isOpen ? <IoCloseOutline size={22} /> : <CiMenuBurger size={22} />}
      </button>

      {isOpen && (
        <div className="absolute top-4 right-7 bg-primary-bgthin p-2 font-montserrat rounded-sm">
          <ul className=" text-white">
            {navAdminMenu.map(({ path, title }) => (
              <NavLink
                className={({ isActive }) =>
                  ` hover:text-primary-yellow hover:bg-primary-dark ${
                    isActive
                      ? "!bg-primary-dark !text-primary-yellow"
                      : "text-white"
                  }`
                }
                to={path}
                key={path}
                end
              >
                <li className="w-full text-left text-sm px-4 py-2 rounded-sm transition">
                  {title}
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      )}
      {/* <button
        onClick={toggleOpen}
        className="text-white absolute top-0 right-0 p-2 rounded-sm bg-primary-bgthin"
      >
        {isOpen ? <IoCloseOutline size={22} /> : <CiMenuBurger size={22} />}
      </button>
      <ul
        className={`${
          !isOpen && "hidden"
        } absolute top-3 right-8 bg-primary-bgthin p-2  rounded-sm`}
      >
        {navAdminMenu.map(({ path, title }) => (
          <NavLink
          className={({ isActive }) =>
            isActive ? "!bg-primary-dark !text-primary-yellow" : ""
          }
            to={path}
            key={path}
          >
            <li className="w-full text-left text-sm px-4 py-2 text-white hover:bg-primary-dark hover:text-primary-yellow">
              {title}
            </li>
          </NavLink>
        ))}
      </ul> */}
    </>
  );
};

export default AdminMenu;
