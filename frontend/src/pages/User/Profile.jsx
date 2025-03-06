import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserProfileMutation } from "../../redux/api/userApiSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLockClosed, IoLockClosedOutline } from "react-icons/io5";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { toast } from "react-toastify";
import { isEmail, isLength, isRequire } from "../../utils/validation";

import { setCredentials } from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader";
import BreakCrumb from "../../components/BreakCrumb";
const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    const passwordError = isLength(6)(
      password,
      "Mật khẩu phải lớn hơn 6 ký tự"
    );
    if (passwordError) {
      toast.error(passwordError);
      return false;
    }

    const confrimPasswordError = isLength(6)(
      confirmPassword,
      "Mật khẩu phải lớn hơn 6 ký tự"
    );
    if (confrimPasswordError) {
      toast.error(confrimPasswordError);
      return false;
    }
    return true;
  };

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp kiểm tra lại");
      return;
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Cập Nhật hồ sơ thành công");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.log(error.message);
        toast.error(error?.data?.error);
      }
    }
  };
  return (
    <>
      <BreakCrumb heading="Hồ Sơ" />
      <div className="py-12 px-4 md:px-0 bg-primary-dark">
        <div className="max-w-screen-xl mx-auto container">
          <form
            onSubmit={submitHandler}
            className="max-w-screen-sm mx-auto  px-6 py-4 bg-primary-bgthin"
          >
            <h1 className="text-3xl font-bold text-white text-center font-arya mb-2">
              Hồ Sơ
            </h1>
            <div className="flex items-center justify-center mb-8">
              <p className="font-bold text-5xl uppercase border-2 border-primary-light text-white bg-primary-red w-[70px] h-[70px] rounded-full flex justify-center items-center">
                <span>{username[0]}</span>
              </p>
            </div>
            <div className="mb-6">
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
            <div className="mb-6">
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

            <div className="mb-6">
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
            <div className="flex justify-between items-center">
              <button
                disabled={isLoading}
                type="submit"
                className="btn-hover-effect"
              >
                <span className="relative z-10 ">
                  {isLoading ? "Đang Tải..." : "Cập Nhật"}
                </span>
              </button>
              <Link to="/my-orders">
                <button className="btn-hover-effect !bg-primary-yellow !border-primary-yellow hover:!text-primary-yellow">
                  <span className="relative z-10 ">Đơn Hàng Của Tôi</span>
                </button>
              </Link>
            </div>
          </form>
          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default Profile;
