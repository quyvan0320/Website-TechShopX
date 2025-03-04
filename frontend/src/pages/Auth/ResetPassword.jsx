import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/api/userApiSlice";
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoLockClosed,
  IoLockClosedOutline,
} from "react-icons/io5";
import { isLength, isRequire } from "../../utils/validation";

const ResetPassword = () => {
  const { token } = useParams(); // Lấy token từ URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [resetPassword, { isLoading, error: resetError }] =
    useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateInputs = () => {
    const passwordError =
      isRequire(password, "Nhập trường mật khẩu") ||
      isLength(6)(password, "Mật khẩu phải lớn hơn 6 ký tự");
    if (passwordError) {
      setError(passwordError);
      return false;
    }

    const confrimPasswordError =
      isRequire(confirmPassword, "Nhập trường xác nhật mật khẩu") ||
      isLength(6)(confirmPassword, "Mật khẩu phải lớn hơn 6 ký tự");
    if (confrimPasswordError) {
      setError(confrimPasswordError);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp!");
      return;
    }

    try {
      const response = await resetPassword({ data: { password }, token }); // Gọi hook resetPassword với dữ liệu
      if (response?.data?.message) {
        setMessage("Mật khẩu đã được thay đổi thành công!");
        setTimeout(() => {
          navigate("/login"); // Chuyển hướng đến trang đăng nhập sau khi reset mật khẩu thành công
        }, 2000);
      }
    } catch (err) {
      setError(
        resetError?.data?.message || "Đã xảy ra lỗi khi đặt lại mật khẩu."
      );
    }
  };

  return (
    <div className="py-12 bg-primary-dark">
      <div className="container mx-auto max-w-screen-sm min-h-[80vh]">
        <form
          onSubmit={handleSubmit}
          className="px-6 py-8 bg-primary-bgthin h-full"
        >
          <h1 className="text-3xl font-bold text-white font-arya mb-2 text-center">
            Đặt Lại Mật Khẩu
          </h1>

         

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

          <div className="mb-4">
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
          {error && <p className="text-center text-red-500">{error}</p>}
          {message && <p className="text-center text-green-500">{message}</p>}
          <button
            type="submit"
            className="btn-hover-effect w-full mt-2"
            disabled={isLoading} // Disabled khi đang gửi yêu cầu
          >
            <span className="relative z-10">Đặt Lại</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
