"use client";

import {
  BookOpen,
  Bot,
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
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavProjects } from "@/components/sidebar/nav-projects";
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

// Define a type for Category
interface Category {
  id: number;
  name: string;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery({});
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Failed to load categories", error);
    return <div>Error loading categories</div>;
  }

  const handleAddCategoryClick = () => {
    setShowAddCategoryModal(true);
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
            url: `/category/${category.id}`,
          })),
          {
            title: "Add Category",
            url: "#",
            icon: PlusSquare,
            className: "font-semibold cursor-pointer",
            onClick: handleAddCategoryClick,
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
        isSimple: true,
      },
      {
        title: "Models",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
