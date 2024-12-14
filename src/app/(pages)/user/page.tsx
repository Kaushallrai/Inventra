import { User, columns } from "./columns";
import { DataTable } from "./data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

async function getData(): Promise<User[]> {
  return [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      lastLogin: "2024-12-12T10:00:00Z",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      lastLogin: "2023-12-01T14:30:00Z",
    },
    {
      id: "3",
      name: "Robert Brown",
      email: "robert.brown@example.com",
      role: "Moderator",
      lastLogin: "2024-12-05T09:15:00Z",
    },
    {
      id: "4",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      role: "User",
      lastLogin: "2024-12-10T16:45:00Z",
    },
    {
      id: "5",
      name: "Michael Wong",
      email: "michael.wong@example.com",
      role: "Admin",
      lastLogin: "2023-11-15T11:20:00Z",
    },
  ];
}

export default async function UsersPage() {
  const data = await getData();

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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
