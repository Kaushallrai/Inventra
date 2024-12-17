"use client";
// import { AddSupplierModal } from "@/components/modal/AddSupplierModal";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";
import { useGetSuppliersQuery } from "@/redux/apiSlice";
// import { EditSupplierModal } from "@/components/modal/EditSupplierModal";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Suppliers() {
  const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);
  const [isEditSupplierModalOpen, setIsEditSupplierModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const { data: suppliers = [] } = useGetSuppliersQuery();

  const handleAddSupplier = () => {
    setEditingSupplier(null);
    setIsAddSupplierModalOpen(true);
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setIsEditSupplierModalOpen(true);
  };

  return (
    <div className="mt-4 ">
      <div>
        <h1 className="text-2xl font-semibold ">Suppliers</h1>
        <div className="flex h-12 shrink-0 items-center gap-2 ">
          <div className="flex items-center gap-2 ">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  Supplier
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>All Suppliers</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={suppliers}
        onAddSupplier={handleAddSupplier}
        onEditSupplier={handleEditSupplier}
      />
      {/* <AddSupplierModal
        isOpen={isAddSupplierModalOpen}
        onClose={() => setIsAddSupplierModalOpen(false)}
      />
      <EditSupplierModal
        isOpen={isEditSupplierModalOpen}
        onClose={() => {
          setIsEditSupplierModalOpen(false);
          setEditingSupplier(null);
        }}
        supplier={editingSupplier}
      /> */}
    </div>
  );
}
