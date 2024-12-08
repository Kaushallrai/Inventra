import { InventoryItem, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<InventoryItem[]> {
  return [
    {
      id: "item001",
      name: "Beer A",
      category: "Liquor",
      quantity: 50,
      pricePerUnit: 150,
      supplier: "Supplier X",
      status: "in-stock",
      lastUpdated: "2024-12-08T10:00:00Z",
    },
    {
      id: "item002",
      name: "Chips B",
      category: "Snacks",
      quantity: 10,
      pricePerUnit: 50,
      supplier: "Supplier Y",
      status: "low-stock",
      lastUpdated: "2024-12-07T14:30:00Z",
    },
    {
      id: "item003",
      name: "Whiskey C",
      category: "Liquor",
      quantity: 0,
      pricePerUnit: 2000,
      supplier: "Supplier Z",
      status: "out-of-stock",
      lastUpdated: "2024-12-05T09:15:00Z",
    },
  ];
}

export default async function Inventory() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
