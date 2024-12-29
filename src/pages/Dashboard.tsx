import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Revenue"
          value="$45,231.89"
          description="+20.1% from last month"
          trend="up"
        />
        <StatCard 
          title="Subscriptions"
          value="2,350"
          description="+180.1% from last month"
          trend="up"
        />
        <StatCard 
          title="Sales"
          value="12,234"
          description="-19.5% from last month"
          trend="down"
        />
        <StatCard 
          title="Active Users"
          value="573"
          description="+201 since last hour"
          trend="up"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <RevenueChart />
        </div>
      </div>
    </div>
  );
}