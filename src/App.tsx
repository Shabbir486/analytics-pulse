
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AdminLayout } from "@/components/layout/AdminLayout";
import Index from "@/pages/Index";
import { Dashboard } from "@/pages/Dashboard";
import { Products } from "@/pages/Products";
import { ProductView } from "@/pages/ProductView";
import { Orders } from "@/pages/Orders";
import { Analytics } from "@/pages/Analytics";
import { Customers } from "@/pages/Customers";
import Users from "@/pages/Users";
import Categories from "@/pages/Categories";

import "./App.css";
import { Toaster } from "sonner";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/products/:id" element={<ProductView />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/customers" element={<Customers />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/categories" element={<Categories />} />
            </Route>
          </Routes>
        </Router>
        <Toaster position="top-right" richColors />
      </QueryClientProvider>
    </>
  );
}

export default App;
