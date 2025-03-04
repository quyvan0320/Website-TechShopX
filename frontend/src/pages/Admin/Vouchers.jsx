import React from "react";
import {
  useDeleteVoucherByIdMutation,
  useFetchAllVoucherQuery,
} from "../../redux/api/voucherApiSlice";
import numeral from "numeral";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { GoTrash } from "react-icons/go";

const Vouchers = () => {
  const { data, refetch, error, isLoading } = useFetchAllVoucherQuery();
  const [deleteVoucherById] = useDeleteVoucherByIdMutation();

  const handleDeleteVoucher = async (id) => {
    try {
      await deleteVoucherById(id).unwrap();
      alert("Voucher đã được xóa");

      // Sau khi xóa thành công, gọi refetch để tải lại danh sách voucher
      refetch();
    } catch (error) {
      alert("Lỗi khi xóa voucher");
    }
  };

  return (
    <div className="container mx-auto max-w-screen-xl min-h-[80vh] relative pb-8">
      <h1 className="text-3xl font-bold text-white primary-dark font-arya mt-6 mb-4 ">
        Quản Lý Voucher
      </h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error?.data?.error || error.message}</Message>
      ) : (
        <div className="text-primary-dark pr-8">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="text-white">
                <th className="border border-gray-300 px-2 py-2 text-[16px] text-center">
                  ID
                </th>

                <th className="border border-gray-300 px-2 py-2 text-[16px] text-center">
                  MÃ
                </th>
                <th className="border border-gray-300 px-2 w-[22%] py-2 text-[16px] text-center">
                  GIẢM
                </th>
                <th className="border border-gray-300 px-2 py-2 text-[16px] text-center">
                  ÁP DỤNG
                </th>
                <th className="border border-gray-300 px-2 py-2 text-[16px] text-center">
                  XÓA
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data?.map((voucher, index) => (
                  <tr
                    key={voucher._id}
                    className={`${
                      index % 2 === 0 ? "text-white" : "text-white"
                    } text-center relative group`}
                  >
                    <td className="border border-gray-300 text-white px-2 py-2">
                      #{voucher._id}
                    </td>
                    <td className="border border-gray-300 px-2 text-sm py-2">
                      {voucher.code}
                    </td>
                    <td className="border border-gray-300 px-2 text-[14px] py-2">
                      {voucher.discountValue}%
                    </td>
                    <td className="border border-gray-300 text-sm px-2 py-2">
                      {numeral(voucher.minimumOrderAmount)
                        .format("0,0")
                        .replace(/,/g, ".")}
                      ₫
                    </td>
                    <td className="border border-gray-300 text-sm px-2 py-2">
                      <button onClick={() => handleDeleteVoucher(voucher._id)}>
                        <GoTrash
                          onClick={() => deleteHandler(_id)}
                          className="text-primary-red cursor-pointer"
                          size={26}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {data.length === 0 && (
            <div className="text-center text-lg ">Không có voucher</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Vouchers;
