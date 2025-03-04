import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";
import { IoMdArrowDropleft } from "react-icons/io";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineLogout, AiOutlineProfile } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [menuActive, setMenuActive] = useState(false);
  const Logo = "/logo.png";
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutMutation();

  const logoutHandler = async () => {
    await logoutUser();
    dispatch(logout());
    navigate("/admin/login");
  };
  return userInfo && userInfo.isAdmin ? (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        closeButton={false}
        autoClose={1500}
        draggable={false}
        pauseOnHover
      />
      <header className=" bg-primary-dark border-b-2 border-gray-500  py-3">
        <nav className="container max-w-screen-xl mx-auto flex items-center justify-between">
          <img
            src={Logo}
            className="w-[200px] object-cover object-center"
            alt=""
          />

          <ul className="flex items-center gap-6">
            {userInfo && (
              <>
                <div
                  className="flex items-center justify-center relative"
                  onClick={toggleMenu}
                >
                  <p className="font-bold text-xl uppercase border-2 border-primary-light text-white bg-primary-blue w-[50px] h-[50px] rounded-full flex justify-center items-center">
                    <span>{userInfo.username[0]}</span>
                  </p>
                  {userInfo && (
                    <ul
                      className={`${
                        !menuActive && "hidden"
                      } absolute top-14 right-0 z-50 bg-white border shadow-2xl overflow-hidden font-bold text-[16px] w-40`}
                    >
                      <li className="px-5 py-3 font-medium text-gray-700 border-b justify-center gap-1 flex items-center">
                        {userInfo.username}
                      </li>

                      <li
                        onClick={logoutHandler}
                        className="px-5 py-2 font-medium cursor-pointer text-primary-red justify-left gap-1 flex items-center"
                      >
                        <AiOutlineLogout />
                        Đăng Xuất
                      </li>
                    </ul>
                  )}
                </div>
              </>
            )}
          </ul>
        </nav>
      </header>
      <div className="flex gap-6 bg-primary-dark">
        <SidebarAdmin />
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

export default AdminRoute;
