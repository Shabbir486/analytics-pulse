import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { AdminLayout } from "./components/layout/AdminLayout";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Products } from "./pages/Products";
import { ProductView } from "./pages/ProductView";
import { Orders } from "./pages/Orders";
import { Customers } from "./pages/Customers";
import { AccountSettings } from "./components/account/AccountSettings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout><Outlet /></AdminLayout>}>
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
    </BrowserRouter>
  );
}