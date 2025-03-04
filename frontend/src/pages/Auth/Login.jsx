import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { isEmail, isLength, isRequire } from "../../utils/validation";
import { BsBox2, BsBox2Heart } from "react-icons/bs";
import { BsBagHeart } from "react-icons/bs";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import Loader from "../../components/Loader";

const Login = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [loginUser, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const search = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

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
      const res = await loginUser({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };
  return (
    <div className="py-12 bg-primary-dark">
      <div className="container mx-auto max-w-screen-lg min-h-[80vh]">
        <div className=" grid grid-cols-2 gap-10 ">
          <form
            onSubmit={submitHandler}
            className="px-6 py-4 bg-primary-bgthin h-full space-y-6"
          >
            <h1 className="text-3xl font-bold text-white font-arya mb-6">
              Bạn đã có tài khoản
            </h1>
            <span className="text-primary-light text-sm">
              Xin chào, vui lòng đăng nhập bằng địa chỉ email và mật khẩu của
              bạn.
            </span>
            <div className="mb-4">
              <label className="font-medium text-primary-light text-[16px]">
                Email
              </label>
              <div className="relative mt-1">
                <HiOutlineUser
                  className="text-primary-light absolute top-[50%] left-2 translate-y-[-50%]"
                  size={26}
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="email..."
                  className="focus:outline-none text-primary-light  bg-transparent pl-10 pr-6 py-2 w-full border"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="font-medium text-primary-light text-[16px]">
                Mật Khẩu
              </label>
              <div className="relative">
                <IoLockClosedOutline
                  className="text-primary-light absolute top-[50%] left-2 translate-y-[-50%]"
                  size={26}
                />
                <p
                  className="absolute top-[50%] right-2 translate-y-[-50%]"
                  onClick={() => toggleShowPassword()}
                >
                  {showPassword ? (
                    <IoEyeOutline size={26} className="text-primary-blue" />
                  ) : (
                    <IoEyeOffOutline size={26} className="text-primary-light" />
                  )}
                </p>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="mật khẩu..."
                  className="focus:outline-none text-primary-light  bg-transparent pl-10 pr-6 py-2 w-full border"
                />
              </div>
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="btn-hover-effect w-full flex items-center justify-center"
            >
              <span className="relative z-10  flex justify-center items-center">
                {isLoading ? (
                  "Đang Tải..."
                ) : (
                  <>
                    Đăng Nhập
                    <span className="ml-1">
                      <MdOutlineArrowRightAlt />
                    </span>
                  </>
                )}
              </span>
            </button>

            <div className="text-left w-full ">
              <Link
                to={redirect ? `/forgot-password?redirect=${redirect}` : `/forgot-password`}
                className="font-medium text-white underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </form>
          <div>
            <div className="px-6 pt-4 pb-8 bg-primary-bgthin ">
              <h1 className="text-3xl font-bold text-white font-arya mb-6">
                Chưa phải là thành viên?
              </h1>
              <span className="text-primary-light text-sm">
                Tạo tài khoản có nhiều lợi ích: thanh toán nhanh hơn, giữ nhiều
                địa chỉ, theo dõi đơn hàng và hơn thế nữa.
              </span>

              <Link
                to={redirect ? `/register?redirect=${redirect}` : `/register`}
              >
                <button className="btn-hover-effect w-full mt-2">
                  <span className="relative z-10  flex justify-center items-center">
                    Tạo Tài Khoản
                    <span className="ml-1">
                      <MdOutlineArrowRightAlt />
                    </span>
                  </span>
                </button>
              </Link>
            </div>
            <div className="bg-primary-blue flex px-6 py-16 items-start justify-between">
              <div className="flex flex-col items-center justify-center">
                <div className="p-5 bg-white">
                  <BsBox2 className=" text-primary-bgthin" size={26} />
                </div>
                <p className="text-[13px] w-[150px] mt-1 text-primary-light font-medium text-center">
                  Theo dõi đơn hàng
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="p-5 bg-white">
                  <BsBagHeart className=" text-primary-bgthin" size={26} />
                </div>
                <p className="text-[13px] w-[150px] mt-1 text-primary-light font-medium text-center">
                  Lưu sản phẩm vào mục yêu thích
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="p-5 bg-white">
                  <LiaUserEditSolid
                    className=" text-primary-bgthin"
                    size={26}
                  />
                </div>
                <p className="text-[13px] w-[150px] mt-1 text-primary-light font-medium text-center">
                  Quản lý dữ liệu
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center w-full mt-6">
          <Link
            to={redirect ? `/?redirect=${redirect}` : `/`}
            className="font-medium text-white underline"
          >
            Trở về trang chủ
          </Link>
        </div>
        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default Login;
