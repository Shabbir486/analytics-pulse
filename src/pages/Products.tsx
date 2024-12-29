import { ProductTable } from "@/components/products/ProductTable";
import { ProductColumnsSelector, ColumnVisibility } from "@/components/products/ProductColumnsSelector";
import { ProductFilters, ProductFilter } from "@/components/products/ProductFilters";
import { useState } from "react";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Products() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    product: true,
    createAt: true,
    stock: true,
    price: true,
    status: true,
  });
  const [activeFilter, setActiveFilter] = useState<ProductFilter | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const mockProducts: Product[] = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    sku: `SKU-${i + 1}`,
    description: `Description for product ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 1,
    discountPrice: Math.floor(Math.random() * 500),
    currency: "USD",
    tax: Math.floor(Math.random() * 100),
    stock: Math.floor(Math.random() * 100),
    reorderThreshold: 10,
    category: ["Electronics", "Clothing", "Books", "Food"][Math.floor(Math.random() * 4)],
    status: Math.random() > 0.5 ? "Published" : "Draft",
    metaTitle: `Product ${i + 1} Meta Title`,
    metaDescription: `Meta description for product ${i + 1}`,
    customUrl: `product-${i + 1}`,
    image: "/placeholder.svg",
    createdAt: new Date().toISOString(),
    tags: ["tag1", "tag2"],
    images: ["/placeholder.svg"],
    rating: 4.5,
    reviews: []
  }));

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = !activeFilter || (
      activeFilter.column === "price" 
        ? Number(product[activeFilter.column]) === Number(activeFilter.value)
        : String(product[activeFilter.column as keyof Product]).toLowerCase().includes(activeFilter.value.toLowerCase())
    );

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts(prev => 
      prev.length === paginatedProducts.length ? [] : paginatedProducts.map(p => p.id)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ProductFilters
            onFilterChange={setActiveFilter}
            activeFilter={activeFilter}
          />
          <ProductColumnsSelector
            columns={columnVisibility}
            onColumnChange={(column) => setColumnVisibility(prev => ({
              ...prev,
              [column]: !prev[column],
            }))}
            onReset={() => setColumnVisibility({
              product: true,
              createAt: true,
              stock: true,
              price: true,
              status: true,
            })}
          />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <ProductTable
        products={paginatedProducts}
        selectedProducts={selectedProducts}
        onSelectProduct={handleSelectProduct}
        onSelectAll={handleSelectAll}
        columnVisibility={columnVisibility}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalRecords={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </div>
  );
}