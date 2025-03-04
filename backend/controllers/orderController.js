import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Voucher from "../models/voucherModel.js";

// Hàm tính giá trị tiền tệ
function calcPrices(orderItems) {
  const itemsPrice = orderItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(0); // Làm tròn tới số nguyên

  const shippingPrice = itemsPrice > 1000000 ? 0 : 10000; // Phí ship (VND)
  const taxRate = 0.1; // Thuế 10%
  const taxPrice = (itemsPrice * taxRate).toFixed(0); // Làm tròn thuế
  const totalPrice = (
    parseFloat(itemsPrice) +
    parseFloat(shippingPrice) +
    parseFloat(taxPrice)
  ).toFixed(0); // Tổng giá trị

  return {
    itemsPrice: parseFloat(itemsPrice), // Chuyển về số
    shippingPrice,
    taxPrice: parseFloat(taxPrice),
    totalPrice: parseFloat(totalPrice),
  };
}

// Tạo đơn hàngUU

  const createOrder = asyncHandler(async (req, res) => {
    try {
      const { orderItems, shippingAddress, paymentMethod, voucherCode } =
        req.body;

     
      if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ error: "Không có đơn đặt hàng" });
      }

     
      const itemsFromDB = await Product.find({
        _id: { $in: orderItems.map((x) => x._id) },
      });

      const dbOrderItems = orderItems.map((itemFromClient) => {
        const matchingItemFromDB = itemsFromDB.find(
          (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
        );
        if (!matchingItemFromDB) {
          throw new Error(`Sản phẩm không tìm thấy: ${itemFromClient._id}`);
        }
        // Kiểm tra hàng còn trong kho
        if (matchingItemFromDB.countInStock < itemFromClient.qty) {
          throw new Error(`Sản phẩm ${matchingItemFromDB.name} đã hết hàng`);
        }
        return {
          ...itemFromClient,
          product: itemFromClient._id,
          price: matchingItemFromDB.price,
          _id: undefined,
        };
      });

      // Tính giá trị ban đầu
      let { itemsPrice, taxPrice, shippingPrice, totalPrice } =
        calcPrices(dbOrderItems);

      // Kiểm tra và áp dụng voucher nếu có
      if (voucherCode) {
        const voucher = await Voucher.findOne({
          code: voucherCode,
          isActive: true,
        });
        if (!voucher) {
          return res
            .status(400)
            .json({ error: "Voucher không hợp lệ hoặc đã hết hạn" });
        }

        // Kiểm tra đơn hàng có đủ điều kiện sử dụng voucher không
        if (totalPrice < voucher.minimumOrderAmount) {
          return res
            .status(400)
            .json({
              error: `Đơn hàng cần tối thiểu ${voucher.minimumOrderAmount} để sử dụng voucher`,
            });
        }

        // Tính toán giảm giá
        let discount = 0;
        if (voucher.discountType === "percent") {
          discount = (totalPrice * voucher.discountValue) / 100;
        } else if (voucher.discountType === "fixed") {
          discount = voucher.discountValue;
        }

        // Cập nhật giá trị đơn hàng sau khi áp dụng voucher
        totalPrice -= discount;
      }

      // Tạo đơn hàng mới
      const order = new Order({
        orderItems: dbOrderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice, 
        isPaid: false, // Đảm bảo giá trị này là đã được giảm giá từ voucher
      });

      const createdOrder = await order.save();

     
    

      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

const fecthAllOrders = asyncHandler(async (req, res) => {
  try {
    const order = await Order.find({}).populate("user", "id username");
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const fecthUserOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const fecthTotalOrders = asyncHandler(async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.status(200).json({ totalOrders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const fecthTotalSales = asyncHandler(async (req, res) => {
  try {
    // Chỉ lấy các đơn hàng đã thanh toán
    const orders = await Order.find({ isPaid: true });

    // Tính tổng doanh thu
    const totalSales = orders.reduce((sum, item) => sum + item.totalPrice, 0);

    res.status(200).json({ totalSales });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const fecthTotalSalesDate = asyncHandler(async (req, res) => {
  try {
    const salesDate = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: { $dateToString: { format: "%d-%m-%Y", date: "$paidAt" } },
          totalSales: { $sum: "$totalPrice" }, // Sửa đúng vị trí và cú pháp
        },
      },
    ]);
    res.status(200).json(salesDate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



const fecthOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "username email");

    if (order) {
      // Kiểm tra nếu giảm giá đã được áp dụng
      const isDiscounted = order.totalPrice < order.itemsPrice + order.taxPrice + order.shippingPrice;

      res.status(200).json({ ...order.toObject(), isDiscounted });
    } else {
      return res.status(404).json({ error: "Đơn hàng không tìm thấy" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


const markOrderAsPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      // Chỉ khi đơn hàng được thanh toán, mới thực hiện giảm số lượng kho
      if (!order.isPaid) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address,
        };

        // Cập nhật số lượng kho hàng chỉ khi đơn hàng được thanh toán
        for (const item of order.orderItems) {
          const product = await Product.findById(item.product);
          if (product) {
            product.countInStock -= item.qty;
            product.quantity += item.qty; // Cập nhật quantity nếu cần
            await product.save();
          }
        }
      }

      const updateOrder = await order.save();
      res.status(200).json(updateOrder);
    } else {
      return res.status(404).json({ error: "Đơn hàng không tìm thấy" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


const markOrderAsDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updateOrder = await order.save();
      res.status(200).json(updateOrder);
    } else {
      return res.status(404).json({ error: "Đơn hàng không tìm thấy" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Số lượng đơn hàng theo trạng thái
const fetchOrderStatusStats = asyncHandler(async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          paidOrders: { $sum: { $cond: ["$isPaid", 1, 0] } },
          deliveredOrders: { $sum: { $cond: ["$isDelivered", 1, 0] } },
        },
      },
    ]);
    res
      .status(200)
      .json(stats[0] || { totalOrders: 0, paidOrders: 0, deliveredOrders: 0 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Doanh thu từng tháng
const fetchMonthlySales = asyncHandler(async (req, res) => {
  try {
    const year = req.query.year || new Date().getFullYear();
    const sales = await Order.aggregate([
      {
        $match: { isPaid: true },
      },
      {
        $group: {
          _id: { $month: "$paidAt" },
          totalSales: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.status(200).json(sales);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export {
  createOrder,
  fecthAllOrders,
  fecthUserOrders,
  fecthTotalOrders,
  fecthTotalSales,
  fecthTotalSalesDate,
  fecthOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
  fetchOrderStatusStats,
  fetchMonthlySales,
};
