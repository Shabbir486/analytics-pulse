import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import { Dashboard } from "@/pages/Dashboard";
import { Products } from "@/pages/Products";
import { Orders } from "@/pages/Orders";
import { Customers } from "@/pages/Customers";
import { ProductView } from "./pages/ProductView";
import Users from "./pages/Users";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="products/:id" element={<ProductView />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </AdminLayout>
      <Toaster />
    </Router>
  );
}

export default App;
