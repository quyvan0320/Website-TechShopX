import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, brand, description, price, category, quantity } = req.fields;
    if (!name) {
      return res.status(400).json({ error: "Nhập tên sản phẩm" });
    }
    if (!description) {
      return res.status(400).json({ error: "Nhập mô tả sản phẩm" });
    }
    if (!price) {
      return res.status(400).json({ error: "Nhập giá sản phẩm" });
    }
    if (!category) {
      return res.status(400).json({ error: "Nhập danh mục sản phẩm" });
    }
    if (!quantity) {
      return res.status(400).json({ error: "Nhập số lượng sản phẩm" });
    }
    if (!brand) {
      return res.status(400).json({ error: "Nhập thương hiệu sản phẩm" });
    }

    const newProduct = await new Product({ ...req.fields }).save();
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const updateProductById = asyncHandler(async (req, res) => {
  try {
    const { name, brand, description, price, category, quantity } = req.fields;
    if (!name) {
      return res.status(400).json({ error: "Nhập tên sản phẩm" });
    }
    if (!description) {
      return res.status(400).json({ error: "Nhập mô tả sản phẩm" });
    }
    if (!price) {
      return res.status(400).json({ error: "Nhập giá sản phẩm" });
    }
    if (!category) {
      return res.status(400).json({ error: "Nhập danh mục sản phẩm" });
    }
    if (!quantity) {
      return res.status(400).json({ error: "Nhập số lượng sản phẩm" });
    }
    if (!brand) {
      return res.status(400).json({ error: "Nhập thương hiệu sản phẩm" });
    }
    if (!req.fields || !req.fields.name) {
      return res.status(400).json({ error: "Dữ liệu không hợp lệ" });
    }
    const product = await Product.findById(req.params.id);
    if (product) {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.fields },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } else {
      return res.status(404).json({ error: "Sản phẩm không tìm thấy" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Sản phẩm đã được xóa" });
    } else {
      return res.status(404).json({ error: "Sản phẩm không tìm thấy" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const addProductReviews = asyncHandler(async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReview = await product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReview) {
        return res.status(400).json({ error: "Sản phẩm đã được đánh giá" });
      }

      const review = {
        name: req.user.username,
        comment,
        rating: Number(rating),
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      await product.save();
      res.status(200).json(review);
    } else {
      return res.status(404).json({ error: "Sản Phẩm không tìm thấy" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fecthAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fecthTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .limit(4)
      .sort({ rating: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fecthNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .limit(5)
      .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fecthProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (product) {
      res.status(200).json(product);
    } else {
      return res.status(404).json({ error: "Sản phẩm không tìm thấy" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fecthProductQuery = asyncHandler(async (req, res) => {
  try {
    const pageSize = 8;
    const keyword = req.body.keyword
      ? { name: { $regex: req.body.keyword, $options: "i" } }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .populate("category")
      .limit(pageSize);
    res.status(200).json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});




const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchProductStats = asyncHandler(async (req, res) => {
  try {
    // Tìm tất cả sản phẩm và tính tổng số lượng bán được và số lượng còn trong kho
    const products = await Product.find();

    // Tính tổng số lượng sản phẩm bán được và tổng số lượng còn trong kho
    let totalSold = 0;
    let totalInStock = 0;

    products.forEach(product => {
      totalSold += product.quantity; // Tổng số sản phẩm đã bán
      totalInStock += product.countInStock; // Tổng số sản phẩm còn trong kho
    });

    // Trả về thống kê
    res.status(200).json({
      totalSold,
      totalInStock,
      totalProducts: products.length, // Tổng số sản phẩm
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Backend - fetchProductByQuery

const fetchProductByQuery = asyncHandler(async (req, res) => {
  try {
    const pageSize = 8;
    const page = parseInt(req.query.page) || 1; // Lấy trang từ query hoặc mặc định là 1
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};

    // Kiểm tra xem keyword có phải là string không
    if (req.query.keyword && typeof req.query.keyword !== 'string') {
      return res.status(400).json({ message: 'Keyword must be a string' });
    }

    const count = await Product.countDocuments({ ...keyword }); // Đếm tổng số sản phẩm thỏa mãn từ khóa
    const products = await Product.find({ ...keyword })
      .populate('category')
      .skip((page - 1) * pageSize) // Lấy sản phẩm bắt đầu từ trang hiện tại
      .limit(pageSize); // Giới hạn số sản phẩm theo pageSize

    res.status(200).json({
      products,
      page,
      pages: Math.ceil(count / pageSize), // Tổng số trang
      hasMore: page < Math.ceil(count / pageSize), // Kiểm tra xem còn trang sau hay không
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




export {
  createProduct,
  updateProductById,
  deleteProductById,
  addProductReviews,
  fecthAllProducts,
  fecthTopProducts,
  fecthNewProducts,
  fecthProductById,
  fecthProductQuery,
  filterProducts,
  fetchProductStats,
  fetchProductByQuery
};
