import React, { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("vi");

const ProductTabs = ({
  loadingReview,
  userInfo,
  submitHandle,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="text-white">
      {/* Tabs Header */}
      <div className="flex space-x-4 border-b border-gray-500">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-4 py-2 ${
            activeTab === "description"
              ? "border-b-2 border-white font-bold"
              : "text-gray-400"
          }`}
        >
          Mô Tả
        </button>
        <button
          onClick={() => setActiveTab("writeRiview")}
          className={`px-4 py-2 ${
            activeTab === "writeRiview"
              ? "border-b-2 border-white font-bold"
              : "text-gray-400"
          }`}
        >
          Viết Đánh Giá Của Bạn
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 ${
            activeTab === "reviews"
              ? "border-b-2 border-white font-bold"
              : "text-gray-400"
          }`}
        >
          Tất Cả Đánh Giá
        </button>
      </div>

      {/* Tabs Content */}
      <div className="mt-4 p-6 border border-gray-500">
        {activeTab === "description" && (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl text-white font-arya ">
                Chào mừng bạn đến với TechShopX
              </h1>
              <div className="border-b border-primary-blue w-20"></div>
              <p className="font-medium text-sm to-primary-light mt-2">
                - Tại đây, chúng tôi luôn nỗ lực không ngừng để mang đến trải
                nghiệm mua sắm tốt nhất cho khách hàng. Từ chất lượng sản phẩm
                đến dịch vụ, mọi thứ đều được thiết kế để đáp ứng nhu cầu của
                bạn.
              </p>
            </div>
            <div>
              <h1 className="text-2xl text-white font-arya ">
                Công nghệ đột phá
              </h1>
              <div className="border-b border-primary-blue w-20"></div>
              <p className="font-medium text-sm to-primary-light mt-2">
                - Sử dụng các giải pháp công nghệ tiên tiến, chúng tôi đảm bảo
                sản phẩm luôn đạt tiêu chuẩn cao nhất. Chúng tôi không chỉ cung
                cấp sản phẩm, mà còn là những giải pháp giúp cuộc sống của bạn
                trở nên tiện lợi hơn.
              </p>
            </div>
            <div>
              <h1 className="text-2xl text-white font-arya ">
                Phù hợp với mọi nhu cầu
              </h1>
              <div className="border-b border-primary-blue w-20"></div>
              <p className="font-medium text-sm to-primary-light mt-2">
                - Từ các thiết bị điện tử hiện đại, đồ gia dụng tiện ích cho đến
                thời trang thời thượng, mọi thứ bạn cần đều có tại TechShopX. Sự
                đa dạng và phong phú về danh mục sản phẩm chính là điều khiến
                chúng tôi tự hào.
              </p>
            </div>
            <div>
              <h1 className="text-2xl text-white font-arya ">
                Dịch vụ giao hàng nhanh chóng
              </h1>
              <div className="border-b border-primary-blue w-20"></div>
              <p className="font-medium text-sm to-primary-light mt-2">
                - Hệ thống giao hàng toàn quốc đảm bảo sản phẩm đến tay bạn một
                cách nhanh chóng, an toàn và tiện lợi nhất. Với quy trình kiểm
                tra chất lượng nghiêm ngặt, bạn hoàn toàn có thể yên tâm về sản
                phẩm nhận được.
              </p>
            </div>
            <div>
              <h1 className="text-2xl text-white font-arya ">
                Khuyến mãi hấp dẫn
              </h1>
              <div className="border-b border-primary-blue w-20"></div>
              <p className="font-medium text-sm to-primary-light mt-2">
                - Chúng tôi luôn có các chương trình ưu đãi đặc biệt dành riêng
                cho bạn. Hãy thường xuyên truy cập để không bỏ lỡ những ưu đãi
                hấp dẫn và cơ hội sở hữu sản phẩm với mức giá cực kỳ ưu đãi.
              </p>
            </div>
            <div>
              <h1 className="text-2xl text-white font-arya ">
                Hỗ trợ khách hàng tận tâm
              </h1>
              <div className="border-b border-primary-blue w-20"></div>
              <p className="font-medium text-sm to-primary-light mt-2">
                - Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ
                bạn 24/7. Bất kể bạn cần tư vấn sản phẩm, hỗ trợ đặt hàng hay
                giải đáp thắc mắc, chúng tôi luôn đồng hành cùng bạn.
              </p>
            </div>
          </div>
        )}
        {activeTab === "writeRiview" && (
          <div className="">
            {userInfo ? (
              <form
                onSubmit={submitHandle}
                className="mx-auto max-w-screen-sm container flex justify-center items-center flex-col text-white"
              >
                <h2 className="text-xl font-bold mb-6 text-center">
                  Viết Một Đánh Giá
                </h2>
                {/* Rating */}
                <div className="mb-6">
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium mb-2 text-primary-light text-center"
                  >
                    Nhận Xét
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-2xl ${
                          rating >= star ? "text-white" : "text-gray-500"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="mb-6 w-full">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium mb-2 text-primary-light text-center"
                  >
                    Nội Dung
                  </label>
                  <textarea
                    id="comment"
                    rows="2"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="viết nội dung đánh giá tại đây..."
                    className="border border-white w-full px-4 py-2 bg-transparent focus:outline-none"
                  ></textarea>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loadingReview}
                  className={`w-1/2 py-3 text-primary-dark bg-white font-bold transition-all-ease ${
                    loadingReview
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-white hover:bg-gray-500"
                  }`}
                >
                  Xác Nhận Đánh Giá
                </button>
              </form>
            ) : (
              <p className="text-center text-lg">
                Vui lòng{" "}
                <Link to={"/login"} className="text-primary-blue underline">
                  đăng nhập
                </Link>{" "}
                để đánh giá sản phẩm!
              </p>
            )}
          </div>
        )}
        {activeTab === "reviews" && (
          <div>
            <div>
              {product.reviews.length === 0 && (
                <p className="text-center font-bold text-white text-2xl">
                  Không Có Đánh Giá
                </p>
              )}
            </div>
            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="py-4  border-b border-gray-500"
                >
                  <div className="flex items-center justify-between">
                    <Ratings value={review.rating} />
                    <p className="text-primary-light text-sm">
                      {dayjs(review.createdAt).fromNow()}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <div className="flex items-center justify-center">
                      <p className="font-bold text-lg uppercase text-white bg-gray-500 w-[40px] h-[40px] flex justify-center items-center">
                        <span>{review.name[0]}</span>
                      </p>
                    </div>
                    <p className="text-sm text-white font-semibold">
                      {review.name}
                    </p>
                  </div>
                  <p className="text-sm text-primary-light font-normal mt-2">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
