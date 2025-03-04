import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  const mastercard = "/mastercard.png";
  const discover = "/discover.png";
  const momo = "/momo.webp";
  const paypal = "/paypal.png";
  const visa = "/visa.png";


  return (
    <>
    <div className="bg-primary-bgthin">
      <div className="container max-w-screen-xl mx-auto pt-8 pb-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white font-arya ">
            Đăng ký nhận tin tức từ chúng tôi
          </h3>
          <h3 className="text-xl font-bold text-white font-arya ">
            Theo dõi chúng tôi tại
          </h3>
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="nhập địa chỉ email..."
              className="w-[18rem] h-[3rem] px-4 py-2 text-sm font-light focus:outline-none text-primary-dark"
            />
            <button className="btn-hover-effect h-[3rem]">
              <span className="relative z-10">Xác Nhận</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-bold text-lg uppercase border-2  text-primary-dark bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center">
              <FaFacebookF />
            </p>
            <p className="font-bold text-lg uppercase border-2  text-primary-dark bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center">
              <FaXTwitter />
            </p>
            <p className="font-bold text-lg uppercase border-2  text-primary-dark bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center">
              <FaYoutube />
            </p>
            <p className="font-bold text-lg uppercase border-2  text-primary-dark bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center">
              <FaPinterestP />
            </p>
            <p className="font-bold text-lg uppercase border-2  text-primary-dark bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center">
              <FaInstagram />
            </p>
          </div>
        </div>
      </div>
      <div className="container max-w-screen-xl mx-auto py-6 flex justify-around">
        <div className="space-y-3">
          <h3 className="text-3xl uppercase font-bold text-white font-arya ">
            Khách
          </h3>
          <div className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            Tìm Kiếm
          </div>
          <p className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            Tất cả sản phẩm
          </p>
          <p className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            Giỏ hàng của tôi
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-3xl uppercase font-bold text-white font-arya ">
            Thông Tin
          </h3>
          <div className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            laptop
          </div>
          <p className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            điện thoại
          </p>
          <p className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            tai nghe
          </p>
          <p className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            đồng hồ thông minh
          </p>
          <p className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            loa
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-3xl uppercase font-bold text-white font-arya ">
            Cửa Hàng
          </h3>
          <div className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            Laptop HP Probook 450 G10
          </div>
          <p className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            Điện thoại vivo V40 Lite
          </p>
          <p className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            Máy tính bảng iPad 9
          </p>
          <p className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            Điện thoại OPPO Reno11 Pro
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-3xl uppercase font-bold text-white font-arya ">
            LIÊN KẾT HỮU ÍCH
          </h3>
          <div className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            Giới thiệu
          </div>
          <p className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            Liên hệ
          </p>
          <p className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            FAQ's
          </p>
          <p className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            Chính sách bảo mật
          </p>
          <p className="text-white text-sm font-medium hover:translate-x-3 transition-all-ease">
            Điều khoản & Điều kiện
          </p>
        </div>
      </div>
    </div>
    <div className="bg-white">
      <div className="container max-w-screen-xl mx-auto py-4 flex justify-between items-center">
        <h1 className="font-normal text-sm text-primary-bgthin">© 2024, TechShopX, Cung cấp bởi Nhóm 1</h1>
        <div className="flex items-center justify-center gap-4">
                    <div className="p-1 bg-white rounded-md border flex items-center justify-center">
                      <img
                        src={mastercard}
                        className="w-10 h-5 object-cover object-center"
                      />
                    </div>
                    <div className="p-1 bg-white rounded-md border flex items-center justify-center">
                      <img
                        src={discover}
                        className="w-10 h-5 object-cover object-center"
                      />
                    </div>
                    <div className="p-1 bg-white rounded-md border flex items-center justify-center">
                      <img
                        src={paypal}
                        className="w-10 h-5 object-contain object-center"
                      />
                    </div>
                    <div className="p-1 bg-white rounded-md border flex items-center justify-center">
                      <img
                        src={momo}
                        className="w-10 h-5 object-contain object-center"
                      />
                    </div>
                    <div className="p-1 bg-white rounded-md border flex items-center justify-center">
                      <img
                        src={visa}
                        className="w-10 h-5 object-contain object-center"
                      />
                    </div>
                  </div>
      </div>
    </div>
    </>
  );
};

export default Footer;
