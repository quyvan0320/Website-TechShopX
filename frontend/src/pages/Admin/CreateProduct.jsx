import React, { useState } from "react";
import { useFetchAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import { isRequire } from "../../utils/validation";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);

  const { data: categories } = useFetchAllCategoriesQuery();
  const [uploadImageProduct] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();

  const uploadImageHandle = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const res = await uploadImageProduct(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
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
    const quantityError = isRequire(quantity, "Nhập số lượng đã bán ít nhất là 1");
    if (quantityError) {
      toast.error(quantityError);
      return false;
    }
    const countInStockError = isRequire(stock, "Nhập số lượng kho");
    if (countInStockError) {
      toast.error(countInStockError);
      return false;
    }
    const categoryError = isRequire(category, "Chọn danh mục");
    if (categoryError) {
      toast.error(categoryError);
      return false;
    }

    return true;
  };

  const createHandle = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    if (stock < 10) {
      toast.error("Vui lòng nhập kho tối thiểu 10");
      return; 
    }
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("countInStock", stock);
      formData.append("category", category);

      const { data } = await createProduct(formData);
      toast.success(`Sản phẩm ${data.name} đã được thêm`);
      navigate("/admin/products");
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.error);
    }
  };

  return (
    <div className="container mx-auto max-w-screen-xl min-h-[80vh] relative pb-8">
      <h1 className="text-3xl font-bold text-white font-arya mt-6 mb-4 ">
        Tạo Sản Phẩm
      </h1>
      <div className="text-primary-dark pr-8">
        {imageUrl && (
          <div className="w-full flex items-center justify-center ">
            <img
              src={imageUrl}
              className="w-[250px] h-[200px] object-cover object-center "
            />
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <label className="col-span-2 text-center  text-white font-medium border rounded-md text-lg border-gray-300 py-6">
            {image ? image.name : "Tải hình ảnh sản phẩm lên"}
            <input
              type="file"
              name="image"
              accept="*/image"
              onChange={uploadImageHandle}
              className={`${!image ? "hidden" : "text-white"}`}
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
              className="text-gray-900 font-semibold border  border-gray-300  text-sm  px-4 rounded-md py-2   w-full"
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
              className="text-gray-900 font-semibold border  border-gray-300  text-sm   px-4 rounded-md py-2 focus:outline-non w-full"
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
              className="text-gray-900 font-semibold border  border-gray-300  text-sm  px-4 rounded-md py-2  w-full"
            />
          </div>
          <div className="col-span-1">
            <label className="font-medium text-lg text-primary-light block">
              Đã Bán
            </label>

            <input
              type="number"
              value={quantity}
              placeholder="số lượng..."
              onChange={(e) => setQuantity(e.target.value)}
              className="text-gray-900 font-semibold border  border-gray-300   text-sm   px-4 rounded-md py-2  w-full"
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
              className="text-gray-900 font-semibold border  border-gray-300 text-sm   px-4 rounded-md py-2  w-full"
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
              className="text-gray-900 font-semibold border  border-gray-300  text-sm  px-4 rounded-md py-2  w-full"
            />
          </div>
          <div className="col-span-1">
            <label className="font-medium text-lg text-primary-light block">
              Danh mục
            </label>
            <select
              className="text-gray-900 font-semibold border  border-gray-300   text-sm   px-4 rounded-md py-2   w-full"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">chọn danh mục...</option>
              {categories?.map((c) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={createHandle}
          type="button"
          className="rounded-sm text-lg text-white font-bold bg-primary-blue px-4 py-2 block mt-4"
        >
          Thêm Sản Phẩm
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
