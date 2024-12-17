interface Category {
  id: number;
  name: string;
}

interface CategoryPageProps {
  category: Category;
}

export default function CategoryPage({ category }: CategoryPageProps) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">{category.name}</h1>
    </div>
  );
}
