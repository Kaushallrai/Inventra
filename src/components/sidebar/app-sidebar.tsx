"use client";

import {
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PieChart,
  Settings2,
  ShoppingBag,
  Package,
  ShoppingCart,
  PlusSquare,
  Pencil,
  Truck,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";

import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useGetCategoriesQuery } from "@/redux/apiSlice";
import { useState } from "react";
import { AddCategoryModal } from "../modal/AddCategoryModal";
import { EditCategoryModal } from "../modal/EditCategoryModal";

interface Category {
  id: number;
  name: string;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: categories = [] } = useGetCategoriesQuery();
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddCategoryClick = () => {
    setShowAddCategoryModal(true);
  };
  const handleEditCategoryClick = () => {
    setIsEditModalOpen(true);
  };

  const data = {
    user: {
      name: "kaushal",
      email: "kaushall.rai@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "B Liquor",
        logo: GalleryVerticalEnd,
        plan: "Standard",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isSimple: true,
      },
      {
        title: "Inventory",
        url: "/inventory",
        icon: Package,
        isSimple: true,
      },
      {
        title: "Products",
        url: "#",
        icon: ShoppingBag,
        items: [
          ...categories.map((category: Category) => ({
            title: category.name,
            url: `/category/${category.name.toLowerCase()}`,
          })),
          {
            title: "Add Category",
            url: "#",
            icon: PlusSquare,
            className: "font-semibold cursor-pointer",
            onClick: handleAddCategoryClick,
          },
          {
            title: "Edit Category",
            url: "#",
            icon: Pencil,
            className: "font-semibold cursor-pointer",
            onClick: handleEditCategoryClick,
          },
        ],
      },
      {
        title: "Sales",
        url: "/sales",
        icon: ShoppingCart,
        isSimple: true,
      },
      {
        title: "Purchase",
        url: "/purchase",
        icon: Package,
      },
      {
        title: "Supplier",
        url: "/supplier",
        icon: Truck,
        isSimple: true,
      },
      {
        title: "Users",
        url: "/user",
        icon: Users,
        isSimple: true,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <AddCategoryModal
        isOpen={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
      />
      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}
