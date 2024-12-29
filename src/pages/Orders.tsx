import { useState } from "react";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { OrdersHeader } from "@/components/orders/OrdersHeader";
import { Order, OrderStatus } from "@/types/order";

// Generate 20 mock orders
const mockNames = ["Product A", "Product B", "Product C", "Product D", "Product E", "Product F", "Product G", "Product H", "Product I", "Product J", "Product K", "Product L", "Product M", "Product N", "Product O", "Product P", "Product Q", "Product R", "Product S", "Product T", "Product U", "Product V", "Product W", "Product X", "Product Y", "Product Z"];
const generateMockOrders = (): Order[] => {
  const statuses: OrderStatus[] = ['pending', 'completed', 'cancelled', 'refunded'];
  const orders: Order[] = [];
  
  for (let i = 1; i <= 20; i++) {
    orders.push({
      id: `#${String(i).padStart(5, '0')}`,
      customer: {
        name: `Customer ${i}`,
        email: `customer${i}@example.com`,
        avatar: "/lovable-uploads/avatar.png"
      },
      date: new Date(2024, 0, i).toISOString(),
      items: [
        {
          id: `item-${i}-1`,
          image: "/lovable-uploads/mock-image.png",
          name: `${mockNames[i - 1]}`,
          quantity: Math.floor(Math.random() * 3) + 1,
          price: 79.99,
          sku: "SKU001"
        },
        {
          id: `item-${i}-2`,
          image: "/lovable-uploads/mock-image.png",
          name: `${mockNames[i - 1]}`,
          quantity: Math.floor(Math.random() * 2) + 1,
          price: 129.99,
          sku: "SKU002"
        }
      ],
      totalPrice: 299.97,
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