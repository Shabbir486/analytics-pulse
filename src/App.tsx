
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductView />} />
            <Route path="orders" element={<Orders />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="customers" element={<Customers />} />
            <Route path="users" element={<Users />} />
            <Route path="categories" element={<Categories />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
