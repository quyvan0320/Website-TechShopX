import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import {
  useDeleteUserByIdMutation,
  useFetchAllUsersQuery,
  useUpdateUserByIdMutation,
} from "../../redux/api/userApiSlice";
import Message from "../../components/Message";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const User = () => {
  const [editUserId, setEditUserId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [updateUser] = useUpdateUserByIdMutation();
  const [deleteUser] = useDeleteUserByIdMutation();

  const { data: users, refetch, isLoading, error } = useFetchAllUsersQuery();
  useEffect(() => {
    refetch();
  }, [refetch]);

  const setUserInformation = (_id, username, email) => {
    setEditUserId(_id);
    setEditUsername(username);
    setEditEmail(email);
  };

  const updateHandler = async (_id) => {
    try {
      const res = await updateUser({
        userId: _id,
        username: editUsername,
        email: editEmail,
      });
      setEditUserId(null);
      refetch();
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      if (window.confirm("Xóa này khoản này?")) {
        const res = await deleteUser(id);
        setEditUserId(null);
        refetch();
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  // Trạng thái tìm kiếm và phân trang
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số lượng người dùng trên mỗi trang

  // Lọc người dùng theo tìm kiếm
  const filteredUsers = users?.filter((user) =>
    user.username?.toLowerCase().includes(search.toLowerCase())
  );

  // Tính toán tổng số trang và dữ liệu hiện tại
  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  };

  // Xử lý chuyển trang
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };
  return (
    <div className="container mx-auto max-w-screen-xl min-h-[80vh] relative">
      <h1 className="text-3xl font-bold text-white font-arya mt-6 mb-4 ">
        Quản Lý Người Dùng
      </h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error?.data?.error || error.message}</Message>
      ) : (
        <div className=" text-primary-light pr-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên..."
              className="border p-2 rounded w-1/3"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <table className="w-full border">
            <thead>
              <tr className="border-b-2 border text-left font-semibold text-white text-lg">
                <th className="p-2">ID</th>
                <th className="p-2">Tên</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phân Quyền</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 &&
                currentUsers.map(({ _id, username, email, isAdmin }) => (
                  <tr key={_id} className="border-b border-white text-left ">
                    <td className="px-2 py-4">#{_id}</td>
                    <td className="px-2 py-4">
                      {editUserId === _id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editUsername}
                            onChange={(e) => setEditUsername(e.target.value)}
                            className="focus:outline-none text-primary-light px-1 bg-transparent rounded-md text-center border"
                          />
                          <button
                            onClick={() => updateHandler(_id)}
                            className="px-2 py-1 bg-primary-yellow rounded-md "
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-primary-light">
                          {username}
                          <button
                            onClick={() =>
                              setUserInformation(_id, username, email)
                            }
                            className="p-1 rounded-sm"
                          >
                            <FaEdit className="text-primary-yellow" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-2 py-4">
                      {editUserId === _id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="focus:outline-none text-primary-light px-1  bg-transparent rounded-md text-center border"
                          />
                          <button
                            onClick={() => updateHandler(_id)}
                            className="px-2 py-1 bg-primary-yellow rounded-md "
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-primary-light">
                          {email}
                          <button
                            onClick={() =>
                              setUserInformation(_id, username, email)
                            }
                            className="p-1  rounded-sm"
                          >
                            <FaEdit className="text-primary-yellow" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-2 py-4 flex items-center justify-center">
                      {isAdmin ? (
                        <GrUserAdmin
                          className="text-green-500 mr-7"
                          size={26}
                        />
                      ) : (
                        <FiUser className="text-primary-blue mr-7" size={26} />
                      )}
                    </td>
                    <td className="px-2 py-4">
                      {!isAdmin && (
                        <GoTrash
                          onClick={() => deleteHandler(_id)}
                          className="text-primary-red mr-7 cursor-pointer"
                          size={26}
                        />
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {currentUsers.length === 0 && (
            <p className="text-center w-full px-4 font-bold py-3 text-xl">
              Không có người dùng
            </p>
          )}
          <div className="mt-4 flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
