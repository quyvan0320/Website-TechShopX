import { VOUCHER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const voucherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createVoucher: builder.mutation({
      query: (data) => ({
        url: VOUCHER_URL,
        method: "POST",
        body: data,
      }),
    }),
    deleteVoucherById: builder.mutation({
      query: (voucherId) => ({
        url: `${VOUCHER_URL}/${voucherId}`,
        method: "DELETE",
      }),
    }),
    fetchAllVoucher: builder.query({
      query: () => ({
        url: VOUCHER_URL,
      }),
    }),
    applyVoucher: builder.mutation({
      query: (data) => ({
        url: `${VOUCHER_URL}/apply-voucher`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateVoucherMutation,
  useDeleteVoucherByIdMutation,
  useFetchAllVoucherQuery,
  useApplyVoucherMutation
} = voucherApiSlice;
