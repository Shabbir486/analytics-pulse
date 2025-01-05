import { CustomersList } from "@/components/customers/CustomersList";

export function Customers() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <CustomersList />
    </div>
  );
}