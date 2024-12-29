import { OrdersHeader } from "@/components/orders/OrdersHeader";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { useState } from "react";

export function Orders() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const mockOrders = [
    {
      id: "1",
      customer: "Angelique Morse",
      date: "2023-01-01",
      total: 150,
      status: "Completed",
    },
    {
      id: "2",
      customer: "Ariana Lang",
      date: "2023-01-02",
      total: 200,
      status: "Pending",
    },
    {
      id: "3",
      customer: "Aspen Schmitt",
      date: "2023-01-03",
      total: 300,
      status: "Cancelled",
    },
    {
      id: "4",
      customer: "Brycen Jimenez",
      date: "2023-01-04",
      total: 400,
      status: "Completed",
    },
    {
      id: "5",
      customer: "Chase Day",
      date: "2023-01-05",
      total: 500,
      status: "Pending",
    },
    // ... Add more mock orders as needed
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
        sortConfig={sortConfig}
        onSortChange={setSortConfig}
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
