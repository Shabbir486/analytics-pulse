export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  discountPrice: number;
  currency: string;
  tax: number;
  stock: number;
  reorderThreshold: number;
  category: string;
  status: string;
  metaTitle: string;
  metaDescription: string;
  customUrl: string;
  image: string;
  createdAt: string;
}