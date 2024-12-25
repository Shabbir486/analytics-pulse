import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import { Products } from "./pages/Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  );
}

export default App;