import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  IoHeartOutline,
  IoCartOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown, IoMdArrowDropleft } from "react-icons/io";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineProfile } from "react-icons/ai";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import FavoriteCount from "../Product/FavoriteCount";
import SearchBar from "../../components/SearchBar";

const Navigation = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  const { userInfo } = useSelector((state) => state.auth);
  const [menuActive, setMenuActive] = useState(false);
  const Logo = "/logo.png";

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const navMenu = [
    { path: "", title: "Trang Chủ" },
    { path: "/shop", title: "Cửa Hàng" },
    { path: "/about", title: "Giới Thiệu" },
    { path: "/contact-us", title: "Liên Hệ" },
  ];

  const [logoutUser] = useLogoutMutation();

  const logoutHandler = async () => {
    await logoutUser();
    dispatch(logout());
    navigate("/");
  };
  return (
    <header className=" bg-primary-dark border-b-2 border-primary-border py-3">
      <nav className="container max-w-screen-xl mx-auto flex items-center justify-between">
        <img
          src={Logo}
          className="w-[200px] object-cover object-center"
          alt=""
        />
        <ul className="flex items-center gap-6">
          {navMenu.map(({ path, title }) => (
            <NavLink
              to={path}
              key={path}
              className={({ isActive }) =>
                isActive
                  ? "underline decoration-2 underline-offset-[5px] decoration-primary-blue"
                  : ""
              }
            >
              <li className=" text-white text-sm font-medium transition-all-ease hover:text-primary-blue">
                {title}
              </li>
            </NavLink>
          ))}
        </ul>

        <ul className="flex items-center gap-4">
          {/* day la icon search  */}
          {showSearch && <SearchBar onClose={toggleSearch} />}
          <li
            onClick={toggleSearch}
            className="text-primary-light hover:text-primary-red transition-all-ease relative cursor-pointer"
          >
            <IoSearchOutline size={30} />
          </li>

          <Link to="/cart">
            <li className="text-primary-light hover:text-primary-red transition-all-ease relative">
              <IoCartOutline size={30} />
              {cartItems.length > 0 && (
                <div className="absolute -top-1 -right-1 w-[18px] h-[18px] text-center text-[12px] bg-primary-red text-white rounded-full">
                  {cartItems.length}
                </div>
              )}
            </li>
          </Link>
          <Link to="/favorite">
            <li className="text-primary-light  hover:text-primary-blue transition-all-ease relative">
              <IoHeartOutline size={30} />
              <FavoriteCount />
            </li>
          </Link>
          {userInfo ? (
            <button
              onClick={toggleMenu}
              className={`${
                menuActive ? "bg-primary-blue" : null
              } flex items-center text-primary-light px-2 text-sm border-2 border-primary-light rounded-full py-1 font-bold relative transition-all duration-300 ease-in-out`}
            >
              <span
                className={
                  menuActive ? "text-primary-dark" : "text-primary-light"
                }
              >
                {userInfo.username}
              </span>
              <IoMdArrowDropleft
                size={20}
                className={
                  menuActive
                    ? `-rotate-90 transition-all-ease text-primary-bgthin`
                    : `rotate-0 transition-all-ease text-primary-light`
                }
              />
              {userInfo && (
                <ul
                  className={`${
                    !menuActive && "hidden"
                  } absolute top-10 right-0 z-50 bg-primary-bgthin shadow-2xl overflow-hidden font-bold text-[16px] w-40`}
                >
                  {userInfo.isAdmin && (
                    <>
                      <Link to="/admin/dashboard">
                        <li className="px-5 py-3 font-arya text-white text-xl justify-center gap-1 flex items-center">
                          <GrUserAdmin />
                          ADMIN
                        </li>
                      </Link>
                      {/* <Link to="/admin/users">
                        <li className="px-5 py-2 text-sm font-normal hover:text-primary-blue text-primary-light">
                          Người Dùng
                        </li>
                      </Link>
                      <Link to="/admin/categories">
                        <li className="px-5 py-2 text-sm font-normal hover:text-primary-blue text-primary-light">
                          Danh Mục
                        </li>
                      </Link>
                      <Link to="/admin/products">
                        <li className="px-5 py-2 text-sm font-normal hover:text-primary-blue text-primary-light">
                          Sản Phẩm
                        </li>
                      </Link>
                      <Link to="/admin/orders">
                        <li className="px-5 py-2 text-sm font-normal hover:text-primary-blue text-primary-light">
                          Đơn Hàng
                        </li>
                      </Link> */}
                    </>
                  )}
                  <Link to="/profile">
                    <li className="px-5 py-3 font-medium text-primary-blue justify-center gap-1 flex items-center">
                      <AiOutlineProfile />
                      Hồ Sơ
                    </li>
                  </Link>
                  <li
                    onClick={logoutHandler}
                    className="px-5 py-3 font-medium text-primary-red justify-center gap-1 flex items-center"
                  >
                    <AiOutlineLogout />
                    Đăng Xuất
                  </li>
                </ul>
              )}
            </button>
          ) : (
            <Link to="/login">
              <li className="btn-hover-effect">
                <span className="relative z-10">Đăng Nhập</span>
              </li>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
