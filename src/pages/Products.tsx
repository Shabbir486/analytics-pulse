import { ProductTable } from "@/components/products/ProductTable";
import { ProductColumnsSelector, ColumnVisibility } from "@/components/products/ProductColumnsSelector";
import { ProductFilters, ProductFilter } from "@/components/products/ProductFilters";
import { useState } from "react";
import type { Product } from "@/types/product";
import { faker } from '@faker-js/faker';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
  const itemsPerPage = 10;

  const generateRandomProducts = (count: number): Product[] => {
    return Array.from({ length: count }, (_, id) => ({
      id: id + 1,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      stock: faker.number.int({ min: 0, max: 100 }),
      sku: faker.string.uuid(),
      discountPrice: parseFloat(faker.commerce.price()),
      currency: faker.finance.currencyCode(),
      tax: parseFloat(faker.commerce.price()),
      category: faker.commerce.department(),
      tags: faker.helpers.arrayElements(['tag1', 'tag2', 'tag3', 'tag4'], 2),
      images: [faker.image.url()],
      rating: parseFloat(faker.number.float({ min: 1, max: 5 }).toFixed(1)),
      reviews: [],
      reorderThreshold: faker.number.int({ min: 1, max: 20 }),
      status: faker.helpers.arrayElement(['Published', 'Draft']),
      metaTitle: faker.lorem.words(3),
      metaDescription: faker.lorem.sentence(),
      customUrl: faker.internet.url(),
      image: faker.image.url(),
      createdAt: faker.date.past().toISOString()
    }));
  };

  const [products] = useState<Product[]>(generateRandomProducts(30));

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts(prev => 
      prev.length === products.length ? [] : products.map(p => p.id)
    );
  };

  const handleColumnChange = (column: keyof ColumnVisibility) => {
    setColumnVisibility(prev => ({
      ...prev,
      [column]: !prev[column],
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

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            onColumnChange={handleColumnChange}
            onReset={handleResetColumns}
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
      />
    </div>
  );
}