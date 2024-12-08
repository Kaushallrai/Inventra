"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  pricePerUnit: number;
  supplier: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
  lastUpdated: string;
};

export const columns: ColumnDef<InventoryItem>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "pricePerUnit",
    header: "Price/Unit",
    cell: ({ row }) => {
      const pricePerUnit = parseFloat(row.getValue("pricePerUnit"));
      const formatted = new Intl.NumberFormat("NP", {
        style: "currency",
        currency: "NPR",
      }).format(pricePerUnit);
      return <div className="font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "supplier",
    header: "Supplier",
  },
  {
    accessorKey: "status",
    header: "Stock Status",
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
  },
];
