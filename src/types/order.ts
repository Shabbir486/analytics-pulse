export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';

export interface OrderItem {
  image: string;
  id: string;
  name: string;
  quantity: number;
  price: number;
  sku: string;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
  date: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
}