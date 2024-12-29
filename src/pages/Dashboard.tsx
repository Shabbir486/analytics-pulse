import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { DollarSign, Users, ShoppingCart, UserPlus } from "lucide-react";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,850"
          icon={DollarSign}
          description="You made an extra $550 this week"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Subscriptions"
          value="2,350"
          icon={Users}
          description="+180.1% from last month"
          trend={{ value: 180.1, isPositive: true }}
        />
        <StatCard
          title="Sales"
          value="12,234"
          icon={ShoppingCart}
          description="-19% from last month"
          trend={{ value: 19, isPositive: false }}
        />
        <StatCard
          title="Active Users"
          value="573"
          icon={UserPlus}
          description="+201 since last hour"
          trend={{ value: 15, isPositive: true }}
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