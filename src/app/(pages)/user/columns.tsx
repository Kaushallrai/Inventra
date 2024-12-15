"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Moderator";
  lastLogin: string;
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="ml-4">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("name");
      return <div className="ml-4">{name}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email");
      return <span className="text-blue-600">{email}</span>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role");
      return (
        <span className="bg-gray-300 py-1 px-2 rounded-md text-black">
          {role}
        </span>
      );
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const lastLogin = new Date(row.getValue("lastLogin"));
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const isActive = lastLogin > threeDaysAgo;

      const statusClasses = isActive
        ? "bg-green-100 text-green-800 border border-green-300"
        : "bg-red-100 text-red-800 border border-red-300";

      return (
        <span className={`py-1 px-2 rounded-md font-medium ${statusClasses}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    cell: ({ row }) => {
      const lastLogin = new Date(row.getValue("lastLogin")).toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
      return <span>{lastLogin}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Edit user", row.original)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => console.log("Delete user", row.original)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      );
    },
  },
];
