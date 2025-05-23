
import {
  BarChart3,
  Box,
  Home,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
  List,
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
        url: "/admin",
      },
      {
        title: "Analytics",
        icon: BarChart3,
        url: "/admin/analytics",
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        title: "Users",
        icon: Users,
        url: "/admin/users",
      },
      {
        title: "Products",
        icon: Box,
        url: "/admin/products",
      },
      {
        title: "Orders",
        icon: ShoppingCart,
        url: "/admin/orders",
      },
      {
        title: "Customers",
        icon: Users,
        url: "/admin/customers",
      },
      {
        title: "Categories",
        icon: List,
        url: "/admin/categories",
      }
    ],
  },
  {
    label: "System",
    items: [
      {
        title: "Settings",
        icon: Settings,
        url: "/admin/settings",
      },
    ],
  },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <div className="p-4 bg-gray-50">
        <h1 className="text-xl font-semibold">Naayaab (Admin Panel)</h1>
      </div>
      <SidebarContent className="bg-gray-50">
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
