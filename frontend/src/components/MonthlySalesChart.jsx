import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useFetchMonthlySalesQuery } from "../redux/api/orderApiSlice";

const MonthlySalesChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const { data, isLoading, error } = useFetchMonthlySalesQuery(year);

  // Hàm định dạng tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Xử lý data để đảm bảo đủ 12 tháng
  const chartData = Array.from({ length: 12 }, (_, index) => {
    const monthData = data?.find((item) => item._id === index + 1); // _id là số tháng
    return {
      month: `Tháng ${index + 1}`,
      totalSales: monthData ? monthData.totalSales : 0,
    };
  });

  if (isLoading) return <p>Đang tải biểu đồ...</p>;
  if (error) return <p>Lỗi: {error.message}</p>;

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 className="text-xl font-bold text-white font-arya mt-6 mb-2">Biểu đồ doanh thu theo tháng</h2>
      <label className="text-lg font-semibold text-white">
        Năm:
        <input
          type="number"
          value={year}
          className="focus:outline-none text-primary-dark w-16 ml-2"
          onChange={(e) => setYear(e.target.value)}
        />
      </label>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 70, left: 70, bottom: 5 }} // Tăng margin để tránh cắt
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
  dataKey="month"
  ticks={chartData.filter((_, index) => index % 2 === 0).map(item => item.month)} // Hiển thị chỉ những tháng chẵn
/>
          <YAxis
            tickFormatter={(value) => formatCurrency(value)} // Định dạng trục Y
            domain={[0, "dataMax + 1000000"]} // Đảm bảo trục Y không bị cắt
          />
          <Tooltip
            formatter={(value) => formatCurrency(value)} // Định dạng Tooltip
          />
          <Bar dataKey="totalSales" fill="#82ca9d" name="Doanh thu" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySalesChart;
