import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import { CgDollar } from "react-icons/cg";
import { BiSolidCartDownload } from "react-icons/bi";
import { LuBoxes, LuClipboardCheck, LuUserCheck } from "react-icons/lu";
import {
  useFetchOrderStatusStatsQuery,
  useFetchTotalOrdersQuery,
  useFetchTotalSalesDateQuery,
  useFetchTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { useFetchAllUsersQuery } from "../../redux/api/userApiSlice";
import {
  useFetchAllProductsQuery,
  useFetchProductStatsQuery,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import numeral from "numeral";
import MonthlySalesChart from "../../components/MonthlySalesChart";
import { GrDeliver } from "react-icons/gr";
import { FaBoxesPacking } from "react-icons/fa6";
import { IoBagCheckOutline } from "react-icons/io5";

const Dashboard = () => {
  // Gọi API
  const { data: sales, isLoading: loadingSales } = useFetchTotalSalesQuery();
  const { data: customers, isLoading: loadingCustomers } =
    useFetchAllUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useFetchTotalOrdersQuery();
  const { data: products, isLoading: loadingProducts } =
    useFetchAllProductsQuery();
  const { data: productStats, isLoading: loadingProductsStats } =
    useFetchProductStatsQuery();
  console.log(productStats);
  const { data: salesDetail } = useFetchTotalSalesDateQuery();
  const totalUsers = customers?.filter((user) => !user.isAdmin).length;
  const { data: orderStatus, isLoading: loadingStatus } =
    useFetchOrderStatusStatsQuery();
  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: "#00E396",
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesData = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));
      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesData.map((item) => item.x),
          },
        },
        series: [
          { name: "Sales", data: formattedSalesData.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <div className="container mx-auto max-w-screen-xl min-h-[80vh] relative">
      <h1 className="text-3xl font-bold text-white font-arya mt-6 mb-4">
        Thống Kê
      </h1>

      {/* Loading */}
      {loadingSales ||
      loadingCustomers ||
      loadingOrders ||
      loadingProducts ||
      loadingProductsStats ||
      loadingStatus ? (
        <Loader />
      ) : (
        <div className="text-primary-dark pr-8 pb-8">
          <div className="grid grid-cols-4 gap-4">
            {/* Doanh Thu */}
            <div className="bg-primary-bgthin border border-gray-300 p-4 rounded-md">
              <div className="flex items-center gap-1">
                <CgDollar size={22} className="text-white" />
                <p className="font-bold text-sm text-white ">Doanh Thu</p>
              </div>
              <p className="font-semibold text-xl text-white mt-2">
                {numeral(sales.totalSales).format("0,0").replace(/,/g, ".")}₫
              </p>
            </div>

            {/* Tổng Đơn Hàng */}
            <div className="bg-primary-bgthin border border-gray-300 p-4 rounded-md">
              <div className="flex items-center gap-1">
                <BiSolidCartDownload size={22} className="text-white" />
                <p className="font-bold text-sm text-white ">
                  Tổng Đơn Hàng
                </p>
              </div>
              <p className="font-semibold text-xl text-white mt-2">
                {numeral(orderStatus.totalOrders).format("0,0")}
              </p>
            </div>

            {/* Tổng Đơn Hàng */}
            <div className="bg-primary-bgthin border border-gray-300 p-4 rounded-md">
              <div className="flex items-center gap-1">
                <LuClipboardCheck size={22} className="text-white" />
                <p className="font-bold text-sm text-white ">
                  Đơn Hàng Thanh Toán
                </p>
              </div>

              <p className="font-semibold text-xl text-white mt-2">
                {numeral(orderStatus.paidOrders).format("0,0")}
              </p>
            </div>

            {/* Tổng Đơn Hàng */}
            <div className="bg-primary-bgthin border border-gray-300 p-4 rounded-md">
              <div className="flex items-center gap-1">
                <GrDeliver size={22} className="text-white" />
                <p className="font-bold text-sm text-white ">
                  Đơn Hàng Đã Giao
                </p>
              </div>

              <p className="font-semibold text-xl text-white mt-2">
                {numeral(orderStatus.deliveredOrders).format("0,0")}
              </p>
            </div>

            {/* Tổng Khách Hàng */}
            <div className="bg-primary-bgthin border border-gray-300 p-4 rounded-md">
              <div className="flex items-center gap-1">
                <LuUserCheck size={22} className="text-white" />
                <p className="font-bold text-sm text-white ">Khách Hàng</p>
              </div>
              <p className="font-semibold text-xl text-white mt-2">
                {totalUsers}
              </p>
            </div>

            {/* Tổng Sản Phẩm Đã Bán */}
            <div className="bg-primary-bgthin border border-gray-300 p-4 rounded-md">
              <div className="flex items-center gap-1">
                <FaBoxesPacking size={22} className="text-white" />
                <p className="font-bold text-sm text-white ">Sản Phẩm</p>
              </div>
              <p className="font-semibold text-xl text-white mt-2">
                {productStats.totalProducts}
              </p>
            </div>

            {/* Tổng Sản Phẩm Đã Bán */}
            <div className="bg-primary-bgthin border border-gray-300 p-4 rounded-md">
              <div className="flex items-center gap-1">
                <IoBagCheckOutline size={22} className="text-white" />
                <p className="font-bold text-sm text-white ">
                  Số Lượng Đã Bán
                </p>
              </div>
              <p className="font-semibold text-xl text-white mt-2">
                {productStats.totalSold}
              </p>
            </div>

            {/* Tổng Sản Phẩm Hiện Có */}
            <div className="bg-primary-bgthin border border-gray-300 p-4 rounded-md">
              <div className="flex items-center gap-1">
                <LuBoxes size={22} className="text-white" />
                <p className="font-bold text-sm text-white ">
                  Số Lượng Trong Kho
                </p>
              </div>
              <p className="font-semibold text-xl text-white mt-2">
                {numeral(productStats.totalInStock).format("0,0")}
              </p>
            </div>
            <div className="col-span-4 ">
              <MonthlySalesChart />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
