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
          const baseItemClasses =
            "flex items-center w-full px-3 py-2 gap-3 hover:bg-gray-100 rounded hover:text-orange-600";
          const activeClasses = "text-orange-600 font-bold bg-gray-200";

          if (item.isSimple) {
            return (
              <SidebarMenuButton
                key={item.title}
                tooltip={item.title}
                className="my-1"
                asChild
              >
                <Link
                  href={item.url}
                  className={`${baseItemClasses} ${
                    pathname === item.url ? activeClasses : ""
                  }`}
                >
                  {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                  <span className="truncate">{item.title}</span>
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
                    className="my-1 w-full"
                    asChild
                  >
                    <div className={`${baseItemClasses}`}>
                      {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                      <span className="flex-grow truncate">{item.title}</span>
                      <ChevronRight className="h-4 w-4 ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </div>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title} className="my-1">
                        <SidebarMenuSubButton asChild onClick={subItem.onClick}>
                          {subItem.onClick ? (
                            <div
                              onClick={subItem.onClick}
                              className={`${baseItemClasses} ${
                                pathname === subItem.url ? activeClasses : ""
                              } ${subItem.className || ""} cursor-pointer`}
                            >
                              {subItem.icon && (
                                <subItem.icon className="h-4 w-4 shrink-0" />
                              )}
                              <span className="truncate">{subItem.title}</span>
                            </div>
                          ) : (
                            <Link
                              href={subItem.url}
                              className={`${baseItemClasses} ${
                                pathname === subItem.url ? activeClasses : ""
                              } ${subItem.className || ""}`}
                            >
                              {subItem.icon && (
                                <subItem.icon className="h-4 w-4 shrink-0" />
                              )}
                              <span className="truncate">{subItem.title}</span>
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
