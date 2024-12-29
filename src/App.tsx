import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "@/components/layouts/AdminLayout";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Orders from "@/pages/Orders";
import Customers from "@/pages/Customers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/products" element={<AdminLayout><Products /></AdminLayout>} />
        <Route path="/orders" element={<AdminLayout><Orders /></AdminLayout>} />
        <Route path="/customers" element={<AdminLayout><Customers /></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;