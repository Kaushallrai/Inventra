"use client";

import { Edit, PlusSquare } from "lucide-react";
import { useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { AddBrandModal } from "../modal/AddBrandModal";
import { EditBrandModal } from "../modal/EditBrandModal";
import { AddVariantModal } from "../modal/AddVariantModal";
import { VariantDataTable } from "./data-table";
import { columns } from "./columns";
import { useGetVariantsQuery } from "@/redux/apiSlice";

interface Brand {
  id: number;
  name: string;
}

interface BrandPageProps {
  category: Brand;
}

export default function BrandPage({ category }: BrandPageProps) {
  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
  const [isEditBrandModalOpen, setIsEditBrandModalOpen] = useState(false);
  const [isAddVariantModalOpen, setIsAddVariantModalOpen] = useState(false);

  const { data: variants = [] } = useGetVariantsQuery();

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{category.name}</h1>
          <div className="flex h-12 shrink-0 items-center gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  Brand
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{category.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-orange-600 hover:bg-orange-500 text-white"
            onClick={() => setIsAddBrandModalOpen(true)}
          >
            <PlusSquare />
            Add Brand
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-500 text-white"
            onClick={() => setIsEditBrandModalOpen(true)}
          >
            <Edit />
            Edit Brand
          </Button>
        </div>
      </div>
      <VariantDataTable
        columns={columns}
        data={variants}
        onAddVariant={() => setIsAddVariantModalOpen(true)}
      />
      <AddBrandModal
        isOpen={isAddBrandModalOpen}
        onClose={() => setIsAddBrandModalOpen(false)}
      />
      <EditBrandModal
        isOpen={isEditBrandModalOpen}
        onClose={() => setIsEditBrandModalOpen(false)}
      />
      <AddVariantModal
        isOpen={isAddVariantModalOpen}
        onClose={() => setIsAddVariantModalOpen(false)}
        category={category}
      />
    </div>
  );
}
