import { ProductTable } from "@/components/products/ProductTable";
import { useState } from "react";

export function Products() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [products] = useState([
    {
      id: "1",
      name: "Product 1",
      description: "Description for Product 1",
      price: 100,
      stock: 50,
    },
    {
      id: "2",
      name: "Product 2",
      description: "Description for Product 2",
      price: 200,
      stock: 30,
    },
    {
      id: "3",
      name: "Product 3",
      description: "Description for Product 3",
      price: 150,
      stock: 20,
    },
    {
      id: "4",
      name: "Product 4",
      description: "Description for Product 4",
      price: 250,
      stock: 10,
    },
    {
      id: "5",
      name: "Product 5",
      description: "Description for Product 5",
      price: 300,
      stock: 5,
    },
    {
      id: "6",
      name: "Product 6",
      description: "Description for Product 6",
      price: 120,
      stock: 40,
    },
    {
      id: "7",
      name: "Product 7",
      description: "Description for Product 7",
      price: 180,
      stock: 25,
    },
    {
      id: "8",
      name: "Product 8",
      description: "Description for Product 8",
      price: 220,
      stock: 15,
    },
    {
      id: "9",
      name: "Product 9",
      description: "Description for Product 9",
      price: 90,
      stock: 60,
    },
    {
      id: "10",
      name: "Product 10",
      description: "Description for Product 10",
      price: 130,
      stock: 35,
    },
    {
      id: "11",
      name: "Product 11",
      description: "Description for Product 11",
      price: 160,
      stock: 45,
    },
    {
      id: "12",
      name: "Product 12",
      description: "Description for Product 12",
      price: 210,
      stock: 20,
    },
    {
      id: "13",
      name: "Product 13",
      description: "Description for Product 13",
      price: 240,
      stock: 10,
    },
    {
      id: "14",
      name: "Product 14",
      description: "Description for Product 14",
      price: 170,
      stock: 30,
    },
    {
      id: "15",
      name: "Product 15",
      description: "Description for Product 15",
      price: 190,
      stock: 25,
    },
    {
      id: "16",
      name: "Product 16",
      description: "Description for Product 16",
      price: 110,
      stock: 50,
    },
    {
      id: "17",
      name: "Product 17",
      description: "Description for Product 17",
      price: 130,
      stock: 40,
    },
    {
      id: "18",
      name: "Product 18",
      description: "Description for Product 18",
      price: 150,
      stock: 30,
    },
    {
      id: "19",
      name: "Product 19",
      description: "Description for Product 19",
      price: 170,
      stock: 20,
    },
    {
      id: "20",
      name: "Product 20",
      description: "Description for Product 20",
      price: 190,
      stock: 10,
    },
  ]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectedProducts(selected ? products.map(p => p.id) : []);
  };

  return (
    <div className="space-y-4">
      <ProductTable
        products={products}
        selectedProducts={selectedProducts}
        onSelectProduct={handleSelectProduct}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
}
