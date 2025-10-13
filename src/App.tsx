import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminLayout } from "@/components/AdminLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Collections from "./pages/admin/Collections";
import Customers from "./pages/admin/Customers";
import AdminGallery from "./pages/admin/Gallery";
import Lookbooks from "./pages/admin/Lookbooks";
import CustomRequests from "./pages/admin/CustomRequests";
import Blog from "./pages/admin/Blog";
import Inventory from "./pages/admin/Inventory";
import Reports from "./pages/admin/Reports";
import Appointments from "./pages/admin/Appointments";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/auth" element={<Auth />} />
               
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
                <Route path="/admin/products" element={<AdminLayout><Products /></AdminLayout>} />
                <Route path="/admin/orders" element={<AdminLayout><Orders /></AdminLayout>} />
                <Route path="/admin/collections" element={<AdminLayout><Collections /></AdminLayout>} />
                <Route path="/admin/customers" element={<AdminLayout><Customers /></AdminLayout>} />
                <Route path="/admin/gallery" element={<AdminLayout><AdminGallery /></AdminLayout>} />
                <Route path="/admin/lookbooks" element={<AdminLayout><Lookbooks /></AdminLayout>} />
                <Route path="/admin/custom-requests" element={<AdminLayout><CustomRequests /></AdminLayout>} />
                <Route path="/admin/blog" element={<AdminLayout><Blog /></AdminLayout>} />
                <Route path="/admin/inventory" element={<AdminLayout><Inventory /></AdminLayout>} />
                <Route path="/admin/reports" element={<AdminLayout><Reports /></AdminLayout>} />
                <Route path="/admin/appointments" element={<AdminLayout><Appointments /></AdminLayout>} />
                <Route path="/admin/settings" element={<AdminLayout><Settings /></AdminLayout>} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
