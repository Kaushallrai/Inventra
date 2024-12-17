"use client";

import CategoryPage from "@/components/category/CategoryPage";
import { useGetCategoryByNameQuery } from "@/redux/apiSlice";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { categoryName: string } }) {
  const [categoryName, setCategoryName] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setCategoryName(resolvedParams.categoryName);
    };

    fetchParams();
  }, [params]);

  const {
    data: category,
    isLoading,
    isError,
  } = useGetCategoryByNameQuery(categoryName ?? "", {
    skip: !categoryName,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !category) {
    return <div>Error: Category not found</div>;
  }

  return <CategoryPage category={category} />;
}
