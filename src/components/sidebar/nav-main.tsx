import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isSimple?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
      onClick?: () => void;
      className?: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs mt-2">Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (item.isSimple) {
            return (
              <SidebarMenuButton
                key={item.title}
                tooltip={item.title}
                className={`my-1 ${pathname === item.url ? "bg-gray-200" : ""}`}
              >
                <Link
                  href={item.url}
                  className="flex gap-2 items-center w-full h-full"
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            );
          }

          return (
            <Collapsible key={item.title} asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`my-1 ${
                      pathname === item.url ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center w-full gap-2">
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </div>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title} className="my-1">
                        <SidebarMenuSubButton asChild>
                          {subItem.onClick ? (
                            <div
                              onClick={subItem.onClick}
                              className={`flex gap-2 items-center w-full ${
                                pathname === subItem.url
                                  ? "text-blue-500 font-bold"
                                  : ""
                              } ${subItem.className || ""}`}
                            >
                              {subItem.icon && (
                                <subItem.icon className="h-4 w-4" />
                              )}
                              <span>{subItem.title}</span>
                            </div>
                          ) : (
                            <Link
                              href={subItem.url}
                              className={`flex gap-2 items-center w-full ${
                                pathname === subItem.url
                                  ? "text-blue-500 font-bold"
                                  : ""
                              } ${subItem.className || ""}`}
                            >
                              {subItem.icon && (
                                <subItem.icon className="h-4 w-4" />
                              )}
                              <span>{subItem.title}</span>
                            </Link>
                          )}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
