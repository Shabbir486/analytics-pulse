import { OrdersHeader } from "@/components/orders/OrdersHeader";
import { OrdersTable } from "@/components/orders/OrdersTable";

export function Orders() {
  return (
    <div className="space-y-6">
      <OrdersHeader />
      <OrdersTable />
    </div>
  );
}