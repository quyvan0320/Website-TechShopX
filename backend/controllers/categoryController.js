import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Vui lòng nhập danh mục" });
    }

    const existCategory = await Category.findOne({ name });
    if (existCategory) {
      return res.status(400).json({ error: "Danh mục đã tồn tại" });
    }

    const newCategory = await new Category({ name }).save();
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const updateCategoryById = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      const alreadyCategory = await Category.findOne({ name: req.body.name });
      if (
        alreadyCategory &&
        alreadyCategory._id.toString() !== req.params.id.toString()
      ) {
        return res.status(400).json({ error: "Danh mục đã tồn tại" });
      }
      category.name = req.body.name || category.name;
      await category.save();
      res.status(200).json(category);
    } else {
      return res.status(404).json({ error: "Danh mục không tìm thấy" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteCategoryById = asyncHandler(async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (category) {
        await category.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Danh mục đã được xóa" });
      } else {
        return res.status(404).json({ error: "Danh mục không tìm thấy" });
      }
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

  const fetchAllCategories = asyncHandler(async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories)
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

  const fetchCategoryById = asyncHandler(async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (category) {
        res.status(200).json(category);
      } else {
        return res.status(404).json({ error: "Danh mục không tìm thấy" });
      }
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

export { createCategory, updateCategoryById, deleteCategoryById, fetchAllCategories, fetchCategoryById };
