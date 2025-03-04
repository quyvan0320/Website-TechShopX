import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginAdminMutation } from "../../redux/api/userApiSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isEmail, isLength, isRequire } from "../../utils/validation";
import { toast, ToastContainer } from "react-toastify";
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { BsBagHeart, BsBox2 } from "react-icons/bs";
import Loader from "../../components/Loader";
import { LiaUserEditSolid } from "react-icons/lia";
import { setCredentials } from "../../redux/features/auth/authSlice";

const LoginAdmin = () => {
  const logo = "/logo.png";
  const { userInfo } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [loginAdmin, { isLoading }] = useLoginAdminMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const search = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/admin/dashboard";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);
  console.log(userInfo);
  const validateInputs = () => {
    const emailError =
      isRequire(email, "Nhập trường email đăng nhập") ||
      isEmail(email, "Nhập đúng định dạng email");
    if (emailError) {
      toast.error(emailError);
      return false;
    }

    const passwordError =
      isRequire(password, "Nhập trường mật khẩu đăng nhập") ||
      isLength(6)(password, "Mật khẩu phải lớn hơn 6 ký tự");
    if (passwordError) {
      toast.error(passwordError);
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const res = await loginAdmin({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error.message);
      toast.error(error?.data?.error || "Đăng nhập thất bại!");
    }
  };
  return (
    <div className="bg-primary-dark">
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        closeButton={false}
        autoClose={1500}
        draggable={false}
        pauseOnHover
      />
      <div className="container mx-auto max-w-screen-lg min-h-[100vh] ">
        <div className="flex justify-center flex-col  pt-20 items-center">
          <img src={logo} alt="" className="w-[200px]" />
          <form
            onSubmit={submitHandler}
            className="px-6 py-4 bg-primary-bgthin border mt-4 h-full space-y-6 w-1/2"
          >
            <h1 className="text-3xl font-bold text-white text-center font-arya mb-6">
              Đăng nhập quản trị viên
            </h1>
            <div className="mb-4">
              <div className="relative mt-1">
                <HiOutlineUser
                  className="text-gray-400 absolute top-[50%] left-2 translate-y-[-50%]"
                  size={26}
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="email..."
                  className="focus:outline-none text-white  bg-transparent pl-10 pr-6 py-2 w-full border"
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <IoLockClosedOutline
                  className="text-gray-400 absolute top-[50%] left-2 translate-y-[-50%]"
                  size={26}
                />
                <p
                  className="absolute top-[50%] right-2 translate-y-[-50%]"
                  onClick={() => toggleShowPassword()}
                >
                  {showPassword ? (
                    <IoEyeOutline size={26} className="text-primary-blue" />
                  ) : (
                    <IoEyeOffOutline size={26} className="text-gray-400" />
                  )}
                </p>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="mật khẩu..."
                  className="focus:outline-none text-white  bg-transparent pl-10 pr-6 py-2 w-full border"
                />
              </div>
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="text-white bg-primary-blue w-full px-4 py-2 transition-all-ease hover:bg-primary-blue/70"
            >
              {isLoading ? "Đang Tải..." : " Đăng Nhập"}
            </button>
          </form>
        </div>

        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default LoginAdmin;
