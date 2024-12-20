import { PlusSquare } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";

interface Category {
  id: number;
  name: string;
}

interface CategoryPageProps {
  category: Category;
}

export default function CategoryPage({ category }: CategoryPageProps) {
  return (
    <div className="mt-4 ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold ">{category.name}</h1>
          <div className="flex h-12 shrink-0 items-center gap-2 ">
            <div className="flex items-center gap-2 ">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    Category
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{category.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </div>
        <div>
          <Button className="bg-blue-600 hover:bg-blue-500 text-white">
            <PlusSquare />
            Add Brand
          </Button>
        </div>
      </div>
    </div>
  );
}
