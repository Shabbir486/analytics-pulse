import { ProductTable } from "@/components/products/ProductTable";
import {
  ProductColumnsSelector,
  ColumnVisibility,
} from "@/components/products/ProductColumnsSelector";
import {
  ProductFilters,
  ProductFilter,
} from "@/components/products/ProductFilters";
import { useState } from "react";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Download, Plus, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProductForm } from "@/components/products/ProductForm";
import { toast } from "sonner";
export function Products() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
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
  const [mockProducts, setMockProducts] = useState<Product[]>([]);

  useEffect(() => {
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
      category: ["Electronics", "Clothing", "Books", "Food"][
        Math.floor(Math.random() * 4)
      ],
      status: Math.random() > 0.5 ? "Published" : "Draft",
      metaTitle: `Product ${i + 1} Meta Title`,
      metaDescription: `Meta description for product ${i + 1}`,
      customUrl: `product-${i + 1}`,
      image: "/placeholder.svg",
      createdAt: new Date().toISOString(),
      tags: ["tag1", "tag2"],
      images: ["/placeholder.svg"],
      rating: 4.5,
      reviews: [],
    }));
    setMockProducts(mockProducts);
  }, []);

  const handleBulkExport = () => {
    const selectedData = mockProducts.filter((product) =>
      selectedProducts.includes(product.id)
    );
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(selectedData[0]).join(",") +
      "\n" +
      selectedData
        .map((product) => Object.values(product).join(","))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Products exported successfully");
  };

  const handleBulkDelete = () => {
    toast.success(`${selectedProducts.length} products deleted`);
    setSelectedProducts([]);
  };

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      !activeFilter ||
      (activeFilter.column === "price"
        ? Number(product[activeFilter.column]) === Number(activeFilter.value)
        : String(product[activeFilter.column as keyof Product])
            .toLowerCase()
            .includes(activeFilter.value.toLowerCase()));

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts((prev) =>
      prev.length === paginatedProducts.length
        ? []
        : paginatedProducts.map((p) => p.id)
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Products</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Dashboard</span>
            <span>•</span>
            <span>Product</span>
            <span>•</span>
            <span>List</span>
          </div>
        </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ProductFilters
            onFilterChange={setActiveFilter}
            activeFilter={activeFilter}
          />
          <ProductColumnsSelector
            columns={columnVisibility}
            onColumnChange={(column) =>
              setColumnVisibility((prev) => ({
                ...prev,
                [column]: !prev[column],
              }))
            }
            onReset={() =>
              setColumnVisibility({
                product: true,
                createAt: true,
                stock: true,
                price: true,
                status: true,
              })
            }
          />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm />
          </DialogContent>
        </Dialog>
      </div>

      {selectedProducts.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkExport}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export Selected
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              className="gap-2"
            >
              <Trash className="h-4 w-4" />
              Delete Selected
            </Button>
          </div>
        )}

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
