import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: PRODUCT_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProductById: builder.mutation({
      query: ({ productId, data }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product", id: productId },
      ],
    }),
    deleteProductById: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),
    addProductReviews: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/reviews/${data.productId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),
    fetchAllProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/all-products`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 2,
    }),
    fetchProductStats: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/stats`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    fetchTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/top-products`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    fetchNewProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/new-products`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    fetchProductQuery: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCT_URL}`,
        params: keyword,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    fetchProductByQuery: builder.query({
      query: ({ keyword, page }) => ({
        url: `${PRODUCT_URL}/search`,
        params: {
          keyword,
          page,
        },
      }),
    }),

    fetchProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
      keepUnusedDataFor: 5,
    }),
    fetchFilteredProducts: builder.query({
      query: ({ checked, radio }) => ({
        url: `${PRODUCT_URL}/filtered-products`,
        method: "POST",
        body: { checked, radio },
      }),
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductByIdMutation,
  useDeleteProductByIdMutation,
  useAddProductReviewsMutation,
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useFetchNewProductsQuery,
  useFetchTopProductsQuery,
  useFetchProductQueryQuery,
  useUploadProductImageMutation,
  useFetchFilteredProductsQuery,
  useFetchProductStatsQuery,
  useFetchProductByQueryQuery,
} = productApiSlice;
