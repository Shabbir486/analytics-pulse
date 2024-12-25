import {
  BarChart3,
  Box,
  Home,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const menuItems = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        url: "/",
      },
      {
        title: "Analytics",
        icon: BarChart3,
        url: "/analytics",
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        title: "Products",
        icon: Box,
        url: "/products",
      },
      {
        title: "Orders",
        icon: ShoppingCart,
        url: "/orders",
      },
      {
        title: "Customers",
        icon: Users,
        url: "/customers",
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        title: "Settings",
        icon: Settings,
        url: "/settings",
      },
    ],
  },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <div className="p-4">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
      </div>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}