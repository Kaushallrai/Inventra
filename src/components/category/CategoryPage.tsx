"use client";
import { Edit, PlusSquare } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { AddBrandModal } from "../modal/AddBrandModal";
import { useState } from "react";
import { EditBrandModal } from "../modal/EditBrandModal";

interface Brand {
  id: number;
  name: string;
}

interface BrandPageProps {
  category: Brand;
}

export default function BrandPage({ category }: BrandPageProps) {
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddBrandClick = () => {
    setShowAddBrandModal(true);
  };
  const handleEditBrandClick = () => {
    setIsEditModalOpen(true);
  };

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
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-orange-600 hover:bg-orange-500 text-white"
            onClick={handleAddBrandClick}
          >
            <PlusSquare />
            Add Brand
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-500 text-white"
            onClick={handleEditBrandClick}
          >
            <Edit />
            Edit Brand
          </Button>
        </div>
      </div>
      <AddBrandModal
        isOpen={showAddBrandModal}
        onClose={() => setShowAddBrandModal(false)}
      />
      <EditBrandModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}
