import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/forgot-password`, // Sửa lỗi typo "forgot-pasword" thành "forgot-password"
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ data, token }) => ({
        url: `${USER_URL}/reset-password/${token}`,
        method: "POST",
        body: data,
      }),
    }),
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login-admin`,
        method: "POST",
        body: data,
      }),
    }),
  
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    fetchAllUsers: builder.query({
      query: () => ({
        url: USER_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["User"],
    }),
    fetchUserById: builder.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    updateUserById: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateUserProfileMutation,
  useFetchAllUsersQuery,
  useFetchUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
  useLoginAdminMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = userApiSlice;
