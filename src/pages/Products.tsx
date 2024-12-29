import { ProductTable } from "@/components/products/ProductTable";

export function Products() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Products</h2>
      <ProductTable />
    </div>
  );
}