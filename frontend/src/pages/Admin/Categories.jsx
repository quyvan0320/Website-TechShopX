import React, { useState } from "react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryByIdMutation,
  useFetchAllCategoriesQuery,
  useUpdateCategoryByIdMutation,
} from "../../redux/api/categoryApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import CategoryForm from "../../components/CategoryForm";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState("");
  const [updatingName, setUpdatingName] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);

  const {
    data: categories,
    refetch,
    isLoading,
    error,
  } = useFetchAllCategoriesQuery();

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryByIdMutation();
  const [deleteCategory] = useDeleteCategoryByIdMutation();

  const createHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await createCategory({ name }).unwrap();
      toast.success(`${name} đã được thêm`);
      setName("");
      refetch();
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  const updateHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();
      toast.success(`${selectedCategory.name} đã được cập nhật`);
      setSelectedCategory(null);
      setVisibleModal(false);
      refetch();
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  const deleteHandle = async () => {
    try {
      const res = await deleteCategory(selectedCategory._id).unwrap();
      toast.success(`${selectedCategory.name} đã được xóa`);
      setSelectedCategory(null);
      setVisibleModal(false);
      refetch();
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

   const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

     // Lọc người dùng theo tìm kiếm
  const filteredCategories = categories?.filter((category) =>
    category.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Tính toán tổng số trang và dữ liệu hiện tại
  const totalPages = Math.ceil(filteredCategories?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = filteredCategories?.slice(
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
        Quản Lý Danh Mục
      </h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error?.data?.error || error.message}</Message>
      ) : (
        <div className="text-primary-dark pr-8">
          <CategoryForm
            value={name}
            setValue={setName}
            title="Thêm Danh Mục"
            submitHandle={createHandle}
          />
          <div className="border-2 my-6"></div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên..."
              className="border p-2 rounded w-1/3"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-4 items-center flex-wrap">
            <table className="w-full border">
              <thead>
                <tr className="border-b-2 border text-left font-semibold text-white text-lg">
                  <th className="p-2">ID</th>
                  <th className="p-2">Tên Danh Mục</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories?.length > 0 &&
                  currentCategories?.map((category) => (
                    <tr className="border-b border-white text-left">
                      <td className="text-white px-2 py-2">#{category._id}</td>
                      <td>
                        <button
                          className=" text-white px-2 py-2"
                          key={category._id}
                          onClick={() => {
                            setVisibleModal(true);
                            setUpdatingName(category.name);
                            setSelectedCategory(category);
                          }}
                        >
                          {category.name}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {currentCategories.length === 0 && (
            <p className="text-center w-full px-4 font-bold text-white py-3 text-xl">
              Không có danh mục
            </p>
          )}
          </div>
          <Modal
            isOpen={visibleModal}
            onClose={() => {
              setVisibleModal(false);
            }}
          >
            <CategoryForm
              value={updatingName}
              setValue={setUpdatingName}
              title="Cập Nhật"
              deleteHandle={deleteHandle}
              submitHandle={updateHandle}
            />
          </Modal>
        </div>
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
  );
};

export default Categories;
