import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Transaction {
  id: number;
  userId: number;
  amount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

interface Brand {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Variant {
  id: number;
  productId: number;
  name: string;
  price: number;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

interface Supplier {
  id: number;
  name: string;
  contact: string | null;
  email: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: [
    "User",
    "Transaction",
    "Category",
    "Product",
    "Brand",
    "Variant",
    "Supplier",
  ],
  endpoints: (builder) => ({
    // User endpoints
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),
    addUser: builder.mutation<
      User,
      Omit<User, "id" | "createdAt" | "updatedAt">
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
    getTransactions: builder.query<Transaction[], void>({
      query: () => "/transactions",
      providesTags: ["Transaction"],
    }),
    addTransaction: builder.mutation<
      Transaction,
      Omit<Transaction, "id" | "createdAt" | "updatedAt">
    >({
      query: (transaction) => ({
        url: "/transactions",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["Transaction"],
    }),
    deleteTransaction: builder.mutation<void, number>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction"],
    }),
    updateTransaction: builder.mutation<
      Transaction,
      Partial<Transaction> & { id: number }
    >({
      query: ({ id, ...transaction }) => ({
        url: `/transactions/${id}`,
        method: "PUT",
        body: transaction,
      }),
      invalidatesTags: ["Transaction"],
    }),
    // Category endpoints
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),
    getCategoryByName: builder.query<Category, string>({
      query: (name) => `/categories/byName/${name}`,
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation<
      Category,
      Omit<Category, "id" | "createdAt" | "updatedAt">
    >({
      query: (category) => ({
        url: "/categories",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<
      Category,
      Partial<Category> & { id: number }
    >({
      query: ({ id, ...category }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    // Product endpoints
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation<
      Product,
      Omit<Product, "id" | "createdAt" | "updatedAt">
    >({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<Product, Partial<Product> & { id: number }>(
      {
        query: ({ id, ...product }) => ({
          url: `/products/${id}`,
          method: "PUT",
          body: product,
        }),
        invalidatesTags: ["Product"],
      }
    ),
    // Brand endpoints
    getBrands: builder.query<Brand[], void>({
      query: () => "/brand",
      providesTags: ["Brand"],
    }),
    addBrand: builder.mutation<
      Brand,
      Omit<Brand, "id" | "createdAt" | "updatedAt">
    >({
      query: (brand) => ({
        url: "/brand",
        method: "POST",
        body: brand,
      }),
      invalidatesTags: ["Brand"],
    }),
    deleteBrand: builder.mutation<void, number>({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrand: builder.mutation<Brand, Partial<Brand> & { id: number }>({
      query: ({ id, ...brand }) => ({
        url: `/brand/${id}`,
        method: "PUT",
        body: brand,
      }),
      invalidatesTags: ["Brand"],
    }),
    // Variant endpoints
    getVariants: builder.query<Variant[], void>({
      query: () => "/variants",
      providesTags: ["Variant"],
    }),
    addVariant: builder.mutation<
      Variant,
      Omit<Variant, "id" | "createdAt" | "updatedAt">
    >({
      query: (variant) => ({
        url: "/variants",
        method: "POST",
        body: variant,
      }),
      invalidatesTags: ["Variant"],
    }),
    deleteVariant: builder.mutation<void, number>({
      query: (id) => ({
        url: `/variants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Variant"],
    }),
    updateVariant: builder.mutation<Variant, Partial<Variant> & { id: number }>(
      {
        query: ({ id, ...variant }) => ({
          url: `/variants/${id}`,
          method: "PUT",
          body: variant,
        }),
        invalidatesTags: ["Variant"],
      }
    ),
    // Supplier endpoints
    getSuppliers: builder.query<Supplier[], void>({
      query: () => "/suppliers",
      providesTags: ["Supplier"],
    }),
    addSupplier: builder.mutation<
      Supplier,
      Omit<Supplier, "id" | "createdAt" | "updatedAt">
    >({
      query: (supplier) => ({
        url: "/suppliers",
        method: "POST",
        body: supplier,
      }),
      invalidatesTags: ["Supplier"],
    }),
    deleteSupplier: builder.mutation<void, number>({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Supplier"],
    }),
    updateSupplier: builder.mutation<
      Supplier,
      Partial<Supplier> & { id: number }
    >({
      query: ({ id, ...supplier }) => ({
        url: `/suppliers/${id}`,
        method: "PUT",
        body: supplier,
      }),
      invalidatesTags: ["Supplier"],
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
  useGetCategoryByNameQuery,
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
  useGetSuppliersQuery,
  useAddSupplierMutation,
  useDeleteSupplierMutation,
  useUpdateSupplierMutation,
} = apiSlice;
