"use client";
import { AddUserModal } from "@/components/modal/AddUserModal";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";
import { useGetUsersQuery } from "@/redux/apiSlice";

export default function UsersPage() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const { data: users = [], isLoading, error } = useGetUsersQuery();

  return (
    <div className="container mx-auto mt-4 px-4">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold mb-2">Users</h1>
        <div className="flex items-center gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">Users</BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>All Users</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <DataTable columns={columns} data={users} />
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
      />
    </div>
  );
}
