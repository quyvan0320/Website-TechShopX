import { CATEGORY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: CATEGORY_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategoryById: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: updatedCategory,
      }),
      invalidatesTags: (result, error, { categoryId }) => [
        { type: "User", id: categoryId },
      ],
    }),
    deleteCategoryById: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, categoryId) => [
        { type: "User", id: categoryId },
      ],
    }),
    fetchAllCategories: builder.query({
      query: () => ({
        url: CATEGORY_URL,
      }),
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),
    fetchCategoryById: builder.query({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
      }),
      providesTags: (result, error, categoryId) => [
        { type: "User", id: categoryId },
      ],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryByIdMutation,
  useDeleteCategoryByIdMutation,
  useFetchAllCategoriesQuery,
  useFetchCategoryByIdQuery,
} = categoryApiSlice;
