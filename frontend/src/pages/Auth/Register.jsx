import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLockClosed, IoLockClosedOutline } from "react-icons/io5";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { toast } from "react-toastify";
import { isEmail, isLength, isRequire } from "../../utils/validation";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import Loader from "../../components/Loader";
const Register = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [registerUser, { isLoading }] = useRegisterMutation();

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
    const usernameError = isRequire(username, "Nhập trường tên người dùng");
    if (usernameError) {
      toast.error(usernameError);
      return false;
    }

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

    const confrimPasswordError =
      isRequire(confirmPassword, "Nhập trường mật khẩu đăng nhập") ||
      isLength(6)(confirmPassword, "Mật khẩu phải lớn hơn 6 ký tự");
    if (confrimPasswordError) {
      toast.error(confrimPasswordError);
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp kiểm tra lại");
      return;
    } else {
      try {
        const res = await registerUser({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Tạo tài khoản thành công");
      } catch (error) {
        console.log(error.message);
        toast.error(error?.data?.error);
      }
    }
  };
  return (
    <div className="p-4 md:py-12 bg-primary-dark">
      <div className="container mx-auto max-w-screen-sm min-h-[80vh]">
        <form
          onSubmit={submitHandler}
          className="px-6 py-8 bg-primary-bgthin h-full"
        >
          <h1 className="text-3xl font-bold text-white font-arya mb-2 text-center">
            Tạo Tài Khoản
          </h1>

          <p className="text-primary-light text-sm text-center mb-8">
            Vui lòng đăng ký bằng cách sử dụng chi tiết tài khoản bên dưới.
          </p>

          <div className="mb-4">
            <label className="font-medium text-primary-light text-[16px]">
              Tên Người Dùng
            </label>
            <div className="relative mt-1">
              <HiOutlineUser
                className="text-primary-light absolute top-[50%] left-2 translate-y-[-50%]"
                size={26}
              />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="tên người dùng..."
                className="focus:outline-none text-primary-light  bg-transparent pl-10 pr-6 py-2 w-full border"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="font-medium text-primary-light text-[16px]">
              Email
            </label>
            <div className="relative mt-1">
              <TfiEmail
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

          <div className="mb-6">
            <label className="font-medium text-primary-light text-[16px]">
              Xác Nhận Mật Khẩu
            </label>
            <div className="relative">
              <IoLockClosed
                className="text-primary-light absolute top-[50%] left-2 translate-y-[-50%]"
                size={26}
              />

              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="xác nhận mật khẩu..."
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
                  Tạo
                  <span className="ml-1">
                    <MdOutlineArrowRightAlt />
                  </span>
                </>
              )}
            </span>
          </button>
        </form>
        <div className="text-center w-full mt-6">
          <Link
            to={redirect ? `/login?redirect=${redirect}` : `/login`}
            className="font-medium text-white underline"
          >
            Quay lại đăng nhập
          </Link>
        </div>
        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default Register;
