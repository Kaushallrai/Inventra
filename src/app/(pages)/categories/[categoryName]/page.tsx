import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { categoryName: string };
}) {
  const category = await getCategoryByName(params.categoryName);

  if (!category) {
    notFound();
  }

  return <CategoryPage category={category} />;
}
