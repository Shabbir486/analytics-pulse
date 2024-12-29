import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={{ value: 45850, isPositive: true }}
          description="You made an extra $550 this week"
          icon="dollar-sign"
        />
        <StatCard
          title="Subscriptions"
          value={{ value: 2350, isPositive: true }}
          description="+180.1% from last month"
          icon="users"
        />
        <StatCard
          title="Sales"
          value={{ value: 12234, isPositive: false }}
          description="-19% from last month"
          icon="shopping-cart"
        />
        <StatCard
          title="Active Users"
          value={{ value: 573, isPositive: true }}
          description="+201 since last hour"
          icon="user-plus"
        />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <RevenueChart />
        </div>
      </div>
    </div>
  );
}