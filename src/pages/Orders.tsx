import { useState } from "react";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { OrdersHeader } from "@/components/orders/OrdersHeader";
import { Order, OrderStatus } from "@/types/order";
import { faker } from '@faker-js/faker';
// Generate 20 mock orders
const generateMockOrders = (): Order[] => {
  const statuses: OrderStatus[] = ['pending', 'completed', 'cancelled', 'refunded'];
  const orders: Order[] = [];


  for (let i = 21; i <= 50; i++) {
    orders.push({
      id: `#${String(i).padStart(5, '0')}`,
      customer: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar()
      },
      date: faker.date.between({ from: new Date('2024-01-01'), to: new Date('2024-01-31') }).toISOString(),
      items: [
        {
          id: `item-${i}-1`,
          image: faker.image.url(),
          name: faker.commerce.productName(),
          quantity: faker.number.int({ min: 1, max: 3 }),
          price: parseFloat(faker.commerce.price()),
          sku: faker.string.alphanumeric(8)
        },
        {
          id: `item-${i}-2`,
          image: faker.image.url(),
          name: faker.commerce.productName(),
          quantity: faker.number.int({ min: 1, max: 2 }),
          price: parseFloat(faker.commerce.price()),
          sku: faker.string.alphanumeric(8)
        }
      ],
      totalPrice: parseFloat(faker.commerce.price()),
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  
  return orders;
};

const mockOrders = generateMockOrders();

export function Orders() {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>
      
      <OrdersHeader
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        mockOrders={mockOrders}
      />
      
      <OrdersTable
        statusFilter={selectedStatus}
        searchQuery={searchQuery}
        dateRange={dateRange}
        mockOrders={mockOrders}
      />
    </div>
  );
}