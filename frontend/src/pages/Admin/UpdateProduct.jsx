import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductByIdMutation,
  useFetchProductByIdQuery,
  useUpdateProductByIdMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { isRequire } from "../../utils/validation";

const UpdateProduct = () => {
  const params = useParams();
  const { data: productData } = useFetchProductByIdQuery(params?._id);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const { data: categories = [] } = useFetchAllCategoriesQuery();
  const [updateProduct] = useUpdateProductByIdMutation();
  const [deleteProduct] = useDeleteProductByIdMutation();
  const [uploadImageProduct] = useUploadProductImageMutation();

  useEffect(() => {
    if (productData) {
      setName(productData?.name || "");
      setBrand(productData?.brand || "");
      setPrice(productData?.price || "");
      setDescription(productData?.description || "");
      setImage(productData?.image || "");
      setQuantity(productData?.quantity || "");
      setCategory(productData?.category?._id || "");
      setStock(productData?.countInStock || "");
    }
  }, [productData]);

  const uploadImageHandle = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const res = await uploadImageProduct(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  const navigate = useNavigate();

  const validateInputs = () => {
      const imageError = isRequire(image, "Up ảnh sản phẩm!");
      if (imageError) {
        toast.error(imageError);
        return false;
      }
      const nameError = isRequire(name, "Nhập tên sản phẩm");
      if (nameError) {
        toast.error(nameError);
        return false;
      }
      const brandError = isRequire(brand, "Nhập thương hiệu");
      if (brandError) {
        toast.error(brandError);
        return false;
      }
      const priceError = isRequire(price, "Nhập giá sản phẩm");
      if (priceError) {
        toast.error(priceError);
        return false;
      }
      const descriptionError = isRequire(description, "Nhập mô tả sản phẩm");
      if (descriptionError) {
        toast.error(descriptionError);
        return false;
      }
      const countInStockError = isRequire(stock, "Nhập số lượng kho");
      if (countInStockError) {
        toast.error(countInStockError);
        return false;
      }
      
  
      return true;
    };

  const updateHandle = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    try {
      const formData = new FormData();
      if (image) formData.append("image", image);
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("countInStock", stock);
      formData.append("category", category);

      const { data } = await updateProduct({
        productId: params._id, 
        data: formData,
      });
      toast.success(`Sản phẩm ${data.name} đã được cập nhật`);
      navigate("/admin/products");
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  const deleteHandle = async (e) => {
    e.preventDefault();
    if (!window.confirm("Xóa sản phẩm này?")) return;
    try {
      const { data } = await deleteProduct(productData._id);
      toast.success(`Sản phẩm ${productData.name} đã được xóa`);
      navigate("/admin/products");
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  return (
    <div className="container mx-auto max-w-screen-xl min-h-[80vh] relative pb-8">
      <h1 className="text-3xl font-bold text-white font-arya mt-6 mb-4 ">
        Cập Nhật Sản Phẩm
      </h1>

      <div className="text-primary-dark pr-8">
        <div className="w-full flex items-center justify-center">
          <img
            src={image}
            className="w-[250px] h-[200px] object-cover object-center "
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="col-span-2 text-center text-white font-semibold  border rounded-md text-lg border-gray-300 py-6">
            {image && typeof image === "object" && image.name
              ? image.name
              : "Tải hình ảnh sản phẩm lên"}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadImageHandle}
              className={`${!image ? "hidden" : "text-white font-semibold"}`}
            />
          </label>
          <div className="col-span-1">
            <label className="font-medium text-lg text-primary-light block">
              Tên
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="tên..."
              className="text-gray-900 font-semibold border  border-gray-300  text-sm px-4 rounded-md py-2 focus:outline-none  w-full"
            />
          </div>
          <div className="col-span-1">
            <label className="font-medium text-lg text-primary-light block">
              Thương Hiệu
            </label>
            <input
              type="text"
              value={brand}
              placeholder="thương hiệu..."
              onChange={(e) => setBrand(e.target.value)}
              className="text-gray-900 font-semibold border  border-gray-300  text-sm  px-4 rounded-md py-2 focus:outline-none  w-full"
            />
          </div>
          <div className="col-span-1">
            <label className="font-medium text-lg text-primary-light block">
              Giá
            </label>

            <input
              type="number"
              value={price}
              placeholder="giá..."
              onChange={(e) => setPrice(e.target.value)}
              className="text-gray-900 font-semibold border  border-gray-300  text-sm  px-4 rounded-md py-2 focus:outline-none  w-full"
            />
          </div>
          <div className="col-span-1">
            <label className="font-medium text-lg text-primary-light block">
              Số Lượng
            </label>

            <input
              type="number"
              value={quantity}
              placeholder="số lượng..."
              onChange={(e) => setQuantity(e.target.value)}
              className="text-gray-900 font-semibold border  border-gray-300  text-sm px-4 rounded-md py-2 focus:outline-none  w-full"
            />
          </div>
          <div className="col-span-2">
            <label className="font-medium text-lg text-primary-light block">
              Mô Tả
            </label>
            <textarea
              type="number"
              value={description}
              placeholder="mô tả..."
              onChange={(e) => setDescription(e.target.value)}
              className="text-gray-900 font-semibold border  border-gray-300 min-h-40  text-sm  px-4 rounded-md py-2 focus:outline-none  w-full"
            ></textarea>
          </div>
          <div className="col-span-1">
            <label className="font-medium text-lg text-primary-light block">
              Kho
            </label>

            <input
              type="number"
              value={stock}
              placeholder="kho..."
              onChange={(e) => setStock(e.target.value)}
              className="text-gray-900 font-semibold border  border-gray-300  text-sm  px-4 rounded-md py-2 focus:outline-none  w-full"
            />
          </div>
          <div className="col-span-1">
            <label className="font-medium text-lg text-primary-light block">
              Danh mục
            </label>
            <select
              className="text-gray-900 font-semibold border  border-gray-300  text-sm px-4 rounded-md py-2 focus:outline-none  w-full"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              {categories && categories.length > 0 ? (
                categories.map((c) => (
                  <option value={c?._id} key={c?._id}>
                    {c?.name}
                  </option>
                ))
              ) : (
                <option value="">Không có danh mục nào</option>
              )}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-12">
          <button
            onClick={updateHandle}
            type="button"
            className="rounded-sm text-lg text-white font-bold  bg-primary-blue px-4 py-2 block mt-4"
          >
            Cập Nhật
          </button>
          <button
            onClick={deleteHandle}
            type="button"
            className="rounded-sm text-lg text-white bg-red-500 px-4 py-2 block mt-4"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
