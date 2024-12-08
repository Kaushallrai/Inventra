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
  status: "In Stock" | "Low Stock" | "Out of Stock" | "Discontinued ";
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
    accessorKey: "id",
    header: "ID",
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
    cell: ({ row }) => {
      const name = row.getValue("name");
      return <div className="ml-4">{name}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category");
      return (
        <span className=" bg-gray-300 py-1 px-2 rounded-md">{category}</span>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = row.getValue("quantity");
      return (
        <span className=" bg-gray-300 py-1 px-2 rounded-md ml-2">
          {quantity}
        </span>
      );
    },
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

      // Split the formatted value into currency symbol and number
      const [currencySymbol, ...numberParts] =
        formatted.split(/(\d+(?:\.\d+)?)/);
      const numberValue = numberParts.join("");

      return (
        <div className="font-medium">
          <span className="text-gray-500">{currencySymbol}</span>
          <span className="font-semibold">&nbsp;{numberValue}</span>
        </div>
      );
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
