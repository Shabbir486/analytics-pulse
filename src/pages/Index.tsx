import { BarChart2, DollarSign, ShoppingCart, Users } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";

const Index = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Admin</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          icon={DollarSign}
          description="+20.1% from last month"
          trend={{ value: 20.1, isPositive: true }}
        />
        <StatCard
          title="Orders"
          value="2,345"
          icon={ShoppingCart}
          description="4 orders pending"
        />
        <StatCard
          title="Customers"
          value="12.5K"
          icon={Users}
          description="+180 this week"
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatCard
          title="Conversion Rate"
          value="3.2%"
          icon={BarChart2}
          description="0.4% decrease"
          trend={{ value: 0.4, isPositive: false }}
        />
      </div>

      <RevenueChart />
    </div>
  );
};

export default Index;