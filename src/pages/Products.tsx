import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Download, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { ProductTable } from "@/components/products/ProductTable";
import { ProductForm } from "@/components/products/ProductForm";
import { Product } from "@/types/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductColumnsSelector, type ColumnVisibility } from "@/components/products/ProductColumnsSelector";
import { ProductFilters, type ProductFilter } from "@/components/products/ProductFilters";

// Extended mock data with 13 entries
const mockProducts = [
  {
    id: 1,
    name: "Urban Explorer Sneakers",
    sku: "UES-001",
    description: "Modern urban sneakers with comfort technology",
    price: 83.74,
    discountPrice: 79.99,
    currency: "USD",
    tax: 10,
    stock: 0,
    reorderThreshold: 10,
    category: "Accessories",
    status: "Draft",
    metaTitle: "Urban Explorer Sneakers",
    metaDescription: "Comfortable urban sneakers for daily wear",
    customUrl: "urban-explorer-sneakers",
    image: "/lovable-uploads/0abfa0b3-7f64-4661-a4d4-52cf395f1d90.png",
    createdAt: "2024-11-29T01:05:00",
  },
  {
    id: 2,
    name: "Classic Leather Loafers",
    sku: "CLL-002",
    description: "Premium leather loafers for formal occasions",
    price: 97.14,
    discountPrice: 89.99,
    currency: "USD",
    tax: 10,
    stock: 72,
    reorderThreshold: 15,
    category: "Shoes",
    status: "Published",
    metaTitle: "Classic Leather Loafers",
    metaDescription: "Premium leather loafers for a sophisticated look",
    customUrl: "classic-leather-loafers",
    image: "/lovable-uploads/1d7ff204-1f12-485d-807f-06cde4656bfe.png",
    createdAt: "2024-11-28T12:05:00",
  },
  {
    id: 3,
    name: "Mountain Trekking Boots",
    sku: "MTB-003",
    description: "Durable boots for mountain adventures",
    price: 68.71,
    discountPrice: 64.99,
    currency: "USD",
    tax: 10,
    stock: 10,
    reorderThreshold: 20,
    category: "Apparel",
    status: "Published",
    metaTitle: "Mountain Trekking Boots",
    metaDescription: "High-performance boots for mountain trekking",
    customUrl: "mountain-trekking-boots",
    image: "/lovable-uploads/aefb88e5-9912-4de1-926c-1f4643ecffe5.png",
    createdAt: "2024-11-26T11:05:00",
  },
  {
    id: 4,
    name: "Running Shoes Pro",
    sku: "RSP-004",
    description: "Professional running shoes with advanced cushioning",
    price: 129.99,
    discountPrice: 119.99,
    currency: "USD",
    tax: 10,
    stock: 45,
    reorderThreshold: 15,
    category: "Shoes",
    status: "Published",
    metaTitle: "Running Shoes Pro",
    metaDescription: "Professional running shoes for athletes",
    customUrl: "running-shoes-pro",
    image: "/lovable-uploads/aefb88e5-9912-4de1-926c-1f4643ecffe5.png",
    createdAt: "2024-11-25T15:30:00",
  },
  {
    id: 5,
    name: "Casual Sneakers",
    sku: "CS-005",
    description: "Comfortable casual sneakers for daily wear",
    price: 79.99,
    discountPrice: 69.99,
    currency: "USD",
    tax: 10,
    stock: 60,
    reorderThreshold: 20,
    category: "Shoes",
    status: "Draft",
    metaTitle: "Casual Sneakers",
    metaDescription: "Comfortable casual sneakers",
    customUrl: "casual-sneakers",
    image: "/lovable-uploads/0abfa0b3-7f64-4661-a4d4-52cf395f1d90.png",
    createdAt: "2024-11-24T09:15:00",
  },
  {
    id: 6,
    name: "Sport Sandals",
    sku: "SS-006",
    description: "Durable sport sandals for outdoor activities",
    price: 49.99,
    discountPrice: 44.99,
    currency: "USD",
    tax: 10,
    stock: 30,
    reorderThreshold: 10,
    category: "Shoes",
    status: "Published",
    metaTitle: "Sport Sandals",
    metaDescription: "Durable sport sandals",
    customUrl: "sport-sandals",
    image: "/lovable-uploads/1d7ff204-1f12-485d-807f-06cde4656bfe.png",
    createdAt: "2024-11-23T14:20:00",
  },
  {
    id: 7,
    name: "Hiking Boots Elite",
    sku: "HBE-007",
    description: "Premium hiking boots for challenging terrains",
    price: 159.99,
    discountPrice: 149.99,
    currency: "USD",
    tax: 10,
    stock: 25,
    reorderThreshold: 8,
    category: "Shoes",
    status: "Published",
    metaTitle: "Hiking Boots Elite",
    metaDescription: "Premium hiking boots",
    customUrl: "hiking-boots-elite",
    image: "/lovable-uploads/aefb88e5-9912-4de1-926c-1f4643ecffe5.png",
    createdAt: "2024-11-22T11:45:00",
  },
  {
    id: 8,
    name: "Canvas Shoes",
    sku: "CVS-008",
    description: "Classic canvas shoes for casual style",
    price: 39.99,
    discountPrice: 34.99,
    currency: "USD",
    tax: 10,
    stock: 90,
    reorderThreshold: 30,
    category: "Shoes",
    status: "Draft",
    metaTitle: "Canvas Shoes",
    metaDescription: "Classic canvas shoes",
    customUrl: "canvas-shoes",
    image: "/lovable-uploads/0abfa0b3-7f64-4661-a4d4-52cf395f1d90.png",
    createdAt: "2024-11-21T16:30:00",
  },
  {
    id: 9,
    name: "Winter Boots",
    sku: "WB-009",
    description: "Warm winter boots with fur lining",
    price: 89.99,
    discountPrice: 79.99,
    currency: "USD",
    tax: 10,
    stock: 40,
    reorderThreshold: 15,
    category: "Shoes",
    status: "Published",
    metaTitle: "Winter Boots",
    metaDescription: "Warm winter boots",
    customUrl: "winter-boots",
    image: "/lovable-uploads/1d7ff204-1f12-485d-807f-06cde4656bfe.png",
    createdAt: "2024-11-20T13:10:00",
  },
  {
    id: 10,
    name: "Slip-On Shoes",
    sku: "SOS-010",
    description: "Convenient slip-on shoes for easy wear",
    price: 54.99,
    discountPrice: 49.99,
    currency: "USD",
    tax: 10,
    stock: 55,
    reorderThreshold: 20,
    category: "Shoes",
    status: "Published",
    metaTitle: "Slip-On Shoes",
    metaDescription: "Convenient slip-on shoes",
    customUrl: "slip-on-shoes",
    image: "/lovable-uploads/aefb88e5-9912-4de1-926c-1f4643ecffe5.png",
    createdAt: "2024-11-19T10:25:00",
  },
  {
    id: 11,
    name: "Kids Sports Shoes",
    sku: "KSS-011",
    description: "Durable sports shoes for kids",
    price: 44.99,
    discountPrice: 39.99,
    currency: "USD",
    tax: 10,
    stock: 70,
    reorderThreshold: 25,
    category: "Kids",
    status: "Draft",
    metaTitle: "Kids Sports Shoes",
    metaDescription: "Sports shoes for kids",
    customUrl: "kids-sports-shoes",
    image: "/lovable-uploads/0abfa0b3-7f64-4661-a4d4-52cf395f1d90.png",
    createdAt: "2024-11-18T15:40:00",
  },
  {
    id: 12,
    name: "Beach Sandals",
    sku: "BS-012",
    description: "Comfortable sandals for beach wear",
    price: 29.99,
    discountPrice: 24.99,
    currency: "USD",
    tax: 10,
    stock: 85,
    reorderThreshold: 30,
    category: "Sandals",
    status: "Published",
    metaTitle: "Beach Sandals",
    metaDescription: "Beach wear sandals",
    customUrl: "beach-sandals",
    image: "/lovable-uploads/1d7ff204-1f12-485d-807f-06cde4656bfe.png",
    createdAt: "2024-11-17T12:55:00",
  },
  {
    id: 13,
    name: "Office Shoes",
    sku: "OS-013",
    description: "Professional office shoes",
    price: 99.99,
    discountPrice: 89.99,
    currency: "USD",
    tax: 10,
    stock: 35,
    reorderThreshold: 12,
    category: "Formal",
    status: "Published",
    metaTitle: "Office Shoes",
    metaDescription: "Professional office shoes",
    customUrl: "office-shoes",
    image: "/lovable-uploads/aefb88e5-9912-4de1-926c-1f4643ecffe5.png",
    createdAt: "2024-11-16T09:30:00",
  }
];

export function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [publishFilter, setPublishFilter] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<ProductFilter | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    product: true,
    createAt: true,
    stock: true,
    price: true,
    status: true,
  });

  const itemsPerPage = 10;

  const applyFilter = (product: Product, filter: ProductFilter): boolean => {
    if (!filter) return true;
    
    const value = String(product[filter.column as keyof Product]).toLowerCase();
    const filterValue = filter.value.toLowerCase();
    
    switch (filter.operator) {
      case "equals":
        return value === filterValue;
      case "contains":
        return value.includes(filterValue);
      case "does not contain":
        return !value.includes(filterValue);
      case "does not equal":
        return value !== filterValue;
      case "starts with":
        return value.startsWith(filterValue);
      case "ends with":
        return value.endsWith(filterValue);
      case "is empty":
        return !value || value.length === 0;
      case "is not empty":
        return value && value.length > 0;
      case "is any of":
        const values = filterValue.split(",").map(v => v.trim().toLowerCase());
        return values.includes(value);
      default:
        return true;
    }
  };

  // Filter products based on all criteria
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStock = stockFilter === "all" ? true :
      stockFilter === "in-stock" ? product.stock > 0 :
      stockFilter === "low-stock" ? product.stock <= product.reorderThreshold :
      product.stock === 0;

    const matchesPublish = publishFilter === "all" ? true :
      publishFilter === "published" ? product.status === "Published" :
      product.status === "Draft";

    const matchesFilter = activeFilter ? applyFilter(product, activeFilter) : true;

    return matchesSearch && matchesStock && matchesPublish && matchesFilter;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
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

  const handleColumnChange = (column: keyof ColumnVisibility) => {
    setColumnVisibility(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const handleResetColumns = () => {
    setColumnVisibility({
      product: true,
      createAt: true,
      stock: true,
      price: true,
      status: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
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

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2">
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Stock status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All stock</SelectItem>
                <SelectItem value="in-stock">In stock</SelectItem>
                <SelectItem value="low-stock">Low stock</SelectItem>
                <SelectItem value="out-of-stock">Out of stock</SelectItem>
              </SelectContent>
            </Select>

            <Select value={publishFilter} onValueChange={setPublishFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Publish status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ProductColumnsSelector
              columns={columnVisibility}
              onColumnChange={handleColumnChange}
              onReset={handleResetColumns}
            />
            <ProductFilters
              onFilterChange={setActiveFilter}
              activeFilter={activeFilter}
            />
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
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
          columnVisibility={columnVisibility}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{" "}
          {filteredProducts.length} results
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
