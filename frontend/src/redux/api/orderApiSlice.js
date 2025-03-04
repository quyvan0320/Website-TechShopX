import { ORDER_URL, PAYPAL_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDER_URL,
        method: "POST",
        body: order,
      }),
    }),
    fetchOrderById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
    }),
    markOrderAsPaid: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDER_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),
    fetchAllOrders: builder.query({
      query: () => ({
        url: ORDER_URL,
      }),
    }),
    fetchUserOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/my-orders`,
      }),
    }),
    markOrderAsDelivered: builder.mutation({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
    fetchTotalOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-orders`,
      }),
    }),
    fetchTotalSales: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-sales`,
      }),
    }),
    fetchTotalSalesDate: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-sales-date`,
      }),
    }),
    fetchPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
    }),
    // Lấy thống kê trạng thái đơn hàng
    fetchOrderStatusStats: builder.query({
      query: () => `${ORDER_URL}/status-stats`, // Không cần params
    }),

    // Lấy thống kê doanh thu theo từng tháng
    fetchMonthlySales: builder.query({
      query: (year = new Date().getFullYear()) => 
        `${ORDER_URL}/monthly-sales?year=${year}`, // Mặc định là năm hiện tại
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useFetchOrderByIdQuery,
  useMarkOrderAsPaidMutation,
  useFetchAllOrdersQuery,
  useFetchUserOrdersQuery,
  useMarkOrderAsDeliveredMutation,
  useFetchTotalOrdersQuery,
  useFetchTotalSalesQuery,
  useFetchTotalSalesDateQuery,
  useFetchPaypalClientIdQuery,
  useFetchOrderStatusStatsQuery,
  useFetchMonthlySalesQuery
} = orderApiSlice;
