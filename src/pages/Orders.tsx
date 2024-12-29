import { OrdersHeader } from "@/components/orders/OrdersHeader";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { useState } from "react";
import { Order, OrderStatus } from "@/types/order";

export function Orders() {
  const [selectedStatus, setSelectedStatus] = useState<"all" | OrderStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const mockOrders: Order[] = [
    {
      id: "1",
      customer: {
        name: "Angelique Morse",
        email: "angelique@example.com",
        avatar: "/placeholder.svg"
      },
      date: "2023-01-01",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 150,
          quantity: 1,
          sku: "SKU001",
          image: "/placeholder.svg"
        }
      ],
      totalPrice: 150,
      status: "pending"
    },
    {
      id: "2",
      customer: {
        name: "Ariana Lang",
        email: "ariana@example.com",
        avatar: "/placeholder.svg"
      },
      date: "2023-01-02",
      items: [
        {
          id: "2",
          name: "Product 2",
          price: 200,
          quantity: 1,
          sku: "SKU002",
          image: "/placeholder.svg"
        }
      ],
      totalPrice: 200,
      status: "pending"
    },
    {
      id: "3",
      customer: {
        name: "Aspen Schmitt",
        email: "aspen@example.com",
        avatar: "/placeholder.svg"
      },
      date: "2023-01-03",
      items: [
        {
          id: "3",
          name: "Product 3",
          price: 300,
          quantity: 1,
          sku: "SKU003",
          image: "/placeholder.svg"
        }
      ],
      totalPrice: 300,
      status: "cancelled"
    },
    {
      id: "4",
      customer: {
        name: "Brycen Jimenez",
        email: "brycen@example.com",
        avatar: "/placeholder.svg"
      },
      date: "2023-01-04",
      items: [
        {
          id: "4",
          name: "Product 4",
          price: 400,
          quantity: 1,
          sku: "SKU004",
          image: "/placeholder.svg"
        }
      ],
      totalPrice: 400,
      status: "completed"
    },
    {
      id: "5",
      customer: {
        name: "Chase Day",
        email: "chase@example.com",
        avatar: "/placeholder.svg"
      },
      date: "2023-01-05",
      items: [
        {
          id: "5",
          name: "Product 5",
          price: 500,
          quantity: 1,
          sku: "SKU005",
          image: "/placeholder.svg"
        }
      ],
      totalPrice: 500,
      status: "pending"
    },
  ];

  return (
    <div className="space-y-4">
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
