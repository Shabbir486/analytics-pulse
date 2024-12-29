import { ProductTable } from "@/components/products/ProductTable";
import { useState } from "react";
import type { Product } from "@/types/product";
import { faker } from '@faker-js/faker';

export function Products() {
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
    status: faker.helpers.arrayElement(['active', 'inactive']),
    metaTitle: faker.lorem.words(3),
    metaDescription: faker.lorem.sentence(),
    customUrl: faker.internet.url(),
    image: faker.image.url(),
    createdAt: faker.date.past().toISOString()
  }));
};

const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
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
