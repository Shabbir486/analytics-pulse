import { useState } from "react";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { OrdersHeader } from "@/components/orders/OrdersHeader";
import { OrderStatus } from "@/types/order";

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
      />
      
      <OrdersTable
        statusFilter={selectedStatus}
        searchQuery={searchQuery}
        dateRange={dateRange}
      />
    </div>
  );
}