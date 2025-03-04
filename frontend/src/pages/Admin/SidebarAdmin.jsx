import React, { useState } from "react";
import { BsBoxSeamFill } from "react-icons/bs";
import {
  FaTachometerAlt,
  FaLayerGroup,
  FaThLarge,
  FaChartLine,
  FaPuzzlePiece,
  FaMapMarkerAlt,
  FaBox,
  FaTable,
  FaPenSquare,
  FaIcons,
  FaUser,
} from "react-icons/fa";
import { GrProductHunt } from "react-icons/gr";
import { HiMiniReceiptPercent } from "react-icons/hi2";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
const SidebarAdmin = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isDashboardOpenTwo, setIsDashboardOpenTwo] = useState(false);

  const toggleDashboardMenu = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };
  const toggleDashboardMenuTwo = () => {
    setIsDashboardOpenTwo(!isDashboardOpenTwo);
  };
  return (
    <div className="min-h-[130vh] w-64 bg-primary-dark shadow-lg border-r">
      {/* Menu */}
      <nav className="">
        <ul>
          <li className="px-4 py-3 hover:bg-primary-bgthin">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center ml-6 ${
                  isActive ? "text-primary-light font-bold" : "text-white"
                }`
              }
            >
              <FaTachometerAlt className="text-primary-light mr-3" />
              <span>Thống Kê</span>
            </NavLink>
          </li>
          <li className="px-4 py-3 hover:bg-primary-bgthin border-t">
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center ml-6 ${
                  isActive ? "text-primary-light font-bold" : "text-white"
                }`
              }
            >
              <FaUser className="text-primary-light mr-3" />
              <span>Người Dùng</span>
            </NavLink>
          </li>
          <li className="px-4 py-3 hover:bg-primary-bgthin border-t">
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `flex items-center ml-6 ${
                  isActive ? "text-primary-light font-bold" : "text-white"
                }`
              }
            >
              <FaThLarge className="text-primary-light mr-3" />
              <span>Danh Mục</span>
            </NavLink>
          </li>
          {/* Dashboard Parent */}
          <li className="px-4 py-3 hover:bg-primary-bgthin border-t">
            <div
              onClick={toggleDashboardMenu}
              className="flex items-center justify-between cursor-pointer"
            >
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `flex items-center ml-6 ${
                    isActive ? "text-primary-light font-bold" : "text-white"
                  }`
                }
              >
                <GrProductHunt className="text-primary-light mr-3" />
                <span>Sản Phẩm</span>
              </NavLink>
              {/* Arrow Icon */}
              {isDashboardOpen ? (
                <IoIosArrowDown className="text-gray-500" />
              ) : (
                <IoIosArrowForward className="text-gray-500" />
              )}
            </div>

            {/* Submenu */}
            {isDashboardOpen && (
              <ul className="ml-8 mt-2">
                <li className="py-2 hover:text-blue-600 text-white">
                  <NavLink to="/admin/products/create">Tạo sản phẩm</NavLink>
                </li>
              </ul>
            )}
          </li>

          <li className="px-4 py-3 hover:bg-primary-bgthin border-t border-b">
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `flex items-center ml-6 ${
                  isActive ? "text-primary-light font-bold" : "text-white"
                }`
              }
            >
              <BsBoxSeamFill className="text-primary-light mr-3" />
              <span>Đơn Hàng</span>
            </NavLink>
          </li>
          {/* Dashboard Parent */}
          <li className="px-4 py-3 hover:bg-primary-bgthin ">
            <div
              onClick={toggleDashboardMenuTwo}
              className="flex items-center justify-between cursor-pointer"
            >
              <NavLink
                to="/admin/vouchers"
                className={({ isActive }) =>
                  `flex items-center ml-6 ${
                    isActive ? "text-primary-light font-bold" : "text-white"
                  }`
                }
              >
                <HiMiniReceiptPercent className="text-primary-light mr-3" />
                <span>Voucher</span>
              </NavLink>
              {/* Arrow Icon */}
              {isDashboardOpenTwo ? (
                <IoIosArrowDown className="text-gray-500" />
              ) : (
                <IoIosArrowForward className="text-gray-500" />
              )}
            </div>

            {/* Submenu */}
            {isDashboardOpenTwo && (
              <ul className="ml-8 mt-2">
                <li className="py-2 hover:text-blue-600 text-white">
                  <NavLink to="/admin/vouchers/create">Tạo voucher</NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarAdmin;
