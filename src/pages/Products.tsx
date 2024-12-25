import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Download, Trash } from "lucide-react";
import { toast } from "sonner";
import { ProductTable } from "@/components/products/ProductTable";
import { ProductForm } from "@/components/products/ProductForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data for initial development
const mockProducts = [
  {
    id: 1,
    name: "Premium Headphones",
    sku: "HDX-100",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    discountPrice: 179.99,
    currency: "USD",
    tax: 20,
    stock: 45,
    reorderThreshold: 10,
    category: "Electronics",
    status: "In Stock",
    metaTitle: "Premium Wireless Headphones",
    metaDescription: "High-quality wireless headphones with noise cancellation feature",
    customUrl: "premium-headphones",
  },
  {
    id: 2,
    name: "Wireless Mouse",
    sku: "WM-200",
    description: "Ergonomic wireless mouse with precision tracking",
    price: 29.99,
    discountPrice: 24.99,
    currency: "USD",
    tax: 5,
    stock: 120,
    reorderThreshold: 20,
    category: "Accessories",
    status: "In Stock",
    metaTitle: "Wireless Mouse",
    metaDescription: "Ergonomic wireless mouse for comfortable use",
    customUrl: "wireless-mouse",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    sku: "KB-300",
    description: "Mechanical gaming keyboard with RGB lighting",
    price: 149.99,
    discountPrice: 129.99,
    currency: "USD",
    tax: 15,
    stock: 5,
    reorderThreshold: 15,
    category: "Accessories",
    status: "Low Stock",
    metaTitle: "Mechanical Gaming Keyboard",
    metaDescription: "RGB mechanical keyboard for gaming enthusiasts",
    customUrl: "mechanical-keyboard",
  },
];

export function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockProducts.length / itemsPerPage);

  // Filter products based on search term
  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current page items
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = () => {
    if (selectedProducts.length === currentProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(currentProducts.map((product) => product.id));
    }
  };

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  };

  const handleBulkDelete = () => {
    toast.success(`${selectedProducts.length} products deleted`);
    setSelectedProducts([]);
  };

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Products</h1>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2" />
              Add Product
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

      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
      </div>

      <div className="border rounded-lg">
        <ProductTable
          products={currentProducts}
          selectedProducts={selectedProducts}
          onSelectProduct={handleSelectProduct}
          onSelectAll={handleSelectAll}
        />
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((p) => Math.max(1, p - 1));
              }}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(i + 1);
                }}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((p) => Math.min(totalPages, p + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
