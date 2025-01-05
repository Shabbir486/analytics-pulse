import { Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AdminLayout } from "./components/layout/AdminLayout";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Users } from "./components/users/Users";
import { Products } from "./components/products/Products";
import { ProductView } from "./components/products/ProductView";
import { Orders } from "./components/orders/Orders";
import { Customers } from "./components/customers/Customers";
import { AccountSettings } from "./components/account/AccountSettings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductView />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="account-settings" element={<AccountSettings />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}
