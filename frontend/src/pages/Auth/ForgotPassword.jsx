import { useState } from "react";
import { useForgotPasswordMutation } from "../../redux/api/userApiSlice";
import { HiOutlineUser } from "react-icons/hi2";
import { isEmail, isRequire } from "../../utils/validation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation(); // Sử dụng mutation từ RTK Query
const validateInputs = () => {
    const emailError =
      isRequire(email, "Nhập trường email gửi mật khẩu") ||
      isEmail(email, "Nhập đúng định dạng email");
    if (emailError) {
      setError(emailError);
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setMessage("");
    setError("");

    try {
      const response = await forgotPassword({ email }).unwrap(); // Gửi yêu cầu quên mật khẩu
      setMessage(response.message); // Hiển thị thông báo thành công
    } catch (err) {
      setError(err.data?.error || "Đã xảy ra lỗi!"); // Hiển thị lỗi nếu có
    }
  };

  return (
    <div className="py-12 bg-primary-dark">
      <div className="container mx-auto max-w-screen-sm min-h-[60vh]">
        <form
          onSubmit={handleSubmit}
          className="px-6 py-8 bg-primary-bgthin h-full"
        >
          <h1 className="text-3xl font-bold text-white font-arya mb-2 text-center">
            Quên Mật Khẩu
          </h1>

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
                className="focus:outline-none text-primary-light bg-transparent pl-10 pr-6 py-2 w-full border"
              />
            </div>
          </div>

          {message && <p className="text-green-500 text-center text-sm mt-2">{message}</p>}
          {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-hover-effect w-full mt-2"
          >
            <span className="relative z-10 ">
              {isLoading ? "Đang gửi..." : "Gửi"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
