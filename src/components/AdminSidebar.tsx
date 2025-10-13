import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingCart, 
  Users, 
  Image, 
  BookOpen, 
  Palette, 
  Newspaper, 
  Package2, 
  BarChart3, 
  Calendar, 
  Settings, 
  User,
  LogOut
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
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Products", url: "/admin/products", icon: Package },
  { title: "Collections", url: "/admin/collections", icon: Layers },
  { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
  { title: "Customers", url: "/admin/customers", icon: Users },
  { title: "Gallery", url: "/admin/gallery", icon: Image },
  { title: "Lookbooks", url: "/admin/lookbooks", icon: BookOpen },
  { title: "Custom Requests", url: "/admin/custom-requests", icon: Palette },
  { title: "Blog", url: "/admin/blog", icon: Newspaper },
  { title: "Inventory", url: "/admin/inventory", icon: Package2 },
  { title: "Reports", url: "/admin/reports", icon: BarChart3 },
  { title: "Appointments", url: "/admin/appointments", icon: Calendar },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { signOut, user } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
         <img
            src={logo}
                alt="BARENTU Logo"
                className="w-full object-cover"
              />
        {/* <h2 className="text-lg font-bold">BARENTU Admin</h2> */}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className={({ isActive }) =>
                        isActive ? "bg-accent text-accent-foreground" : ""
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-2 mb-2">
          <User className="h-4 w-4" />
          <span className="text-sm truncate">{user?.email}</span>
        </div>
        <Button onClick={signOut} variant="outline" size="sm" className="w-full">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}