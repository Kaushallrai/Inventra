// src/redux/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["User", "Transaction", "Category", "Product", "Brand", "Variant"],
  endpoints: (builder) => ({
    // User endpoints
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),
    addUser: builder.mutation<
      User,
      Omit<User, "id" | "createdAt" | "updatedAt"> & { password: string }
    >({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<User, Partial<User> & { id: number }>({
      query: ({ id, ...user }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    // Transaction endpoints
    getTransactions: builder.query({
      query: () => "/transactions",
      providesTags: ["Transaction"],
    }),
    addTransaction: builder.mutation({
      query: (transaction) => ({
        url: "/transactions",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["Transaction", "Variant"],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction"],
    }),
    updateTransaction: builder.mutation({
      query: ({ id, ...transaction }) => ({
        url: `/transactions/${id}`,
        method: "PUT",
        body: transaction,
      }),
      invalidatesTags: ["Transaction"],
    }),

    // Category endpoints
    getCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation({
      query: (category) => ({
        url: "/categories",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<Category, { id: number; name: string }>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, name }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: ["Category"],
    }),

    // Product endpoints
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product", "Category"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    // Brand endpoints
    getBrands: builder.query({
      query: () => "/brands",
      providesTags: ["Brand"],
    }),
    addBrand: builder.mutation({
      query: (brand) => ({
        url: "/brands",
        method: "POST",
        body: brand,
      }),
      invalidatesTags: ["Brand", "Product"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrand: builder.mutation({
      query: ({ id, ...brand }) => ({
        url: `/brands/${id}`,
        method: "PUT",
        body: brand,
      }),
      invalidatesTags: ["Brand"],
    }),

    // Variant endpoints
    getVariants: builder.query({
      query: () => "/variants",
      providesTags: ["Variant"],
    }),
    addVariant: builder.mutation({
      query: (variant) => ({
        url: "/variants",
        method: "POST",
        body: variant,
      }),
      invalidatesTags: ["Variant", "Brand"],
    }),
    deleteVariant: builder.mutation({
      query: (id) => ({
        url: `/variants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Variant"],
    }),
    updateVariant: builder.mutation({
      query: ({ id, ...variant }) => ({
        url: `/variants/${id}`,
        method: "PUT",
        body: variant,
      }),
      invalidatesTags: ["Variant"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetBrandsQuery,
  useAddBrandMutation,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
  useGetVariantsQuery,
  useAddVariantMutation,
  useDeleteVariantMutation,
  useUpdateVariantMutation,
} = apiSlice;
