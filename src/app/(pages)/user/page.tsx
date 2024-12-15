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
import { EditUserModal } from "@/components/modal/EditUserModal";

export default function Users() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const { data: users = [] } = useGetUsersQuery();

  const handleAddUser = () => {
    setEditingUser(null);
    setIsAddUserModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditUserModalOpen(true);
  };

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
      <DataTable
        columns={columns}
        data={users}
        onAddUser={handleAddUser}
        onEditUser={handleEditUser}
      />
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
      />
      <EditUserModal
        isOpen={isEditUserModalOpen}
        onClose={() => {
          setIsEditUserModalOpen(false);
          setEditingUser(null);
        }}
        user={editingUser}
      />
    </div>
  );
}
