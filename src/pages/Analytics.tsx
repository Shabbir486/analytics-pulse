import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { Users, Package, DollarSign, ShoppingCart, ArrowUpRight, ArrowDownRight, Eye, Heart, Search } from "lucide-react";

export function Analytics() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Revenue"
              value="$45,231.89"
              icon={DollarSign}
              description="This month"
              trend={{ value: 20.1, isPositive: true }}
            />
            <StatCard
              title="Orders"
              value="356"
              icon={ShoppingCart}
              description="This month"
              trend={{ value: 8.2, isPositive: true }}
            />
            <StatCard
              title="Average Order Value"
              value="$127.00"
              icon={Package}
              description="Per order"
              trend={{ value: 4.5, isPositive: true }}
            />
            <StatCard
              title="Conversion Rate"
              value="3.2%"
              icon={ArrowUpRight}
              description="From last month"
              trend={{ value: 1.2, isPositive: true }}
            />
          </div>

          <RevenueChart />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Cotton Saree", sales: 245, revenue: "$12,450" },
                    { name: "Silk Suit", sales: 189, revenue: "$9,450" },
                    { name: "Designer Lehenga", sales: 124, revenue: "$18,600" },
                  ].map((product) => (
                    <div key={product.name} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                      </div>
                      <p className="font-medium">{product.revenue}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "18-24", value: "15%" },
                    { label: "25-34", value: "40%" },
                    { label: "35-44", value: "25%" },
                    { label: "45+", value: "20%" },
                  ].map((demographic) => (
                    <div key={demographic.label} className="flex items-center justify-between">
                      <p className="text-sm">{demographic.label}</p>
                      <p className="font-medium">{demographic.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: "Direct", percentage: "35%" },
                    { source: "Social Media", percentage: "25%" },
                    { source: "Search", percentage: "30%" },
                    { source: "Referral", percentage: "10%" },
                  ].map((source) => (
                    <div key={source.source} className="flex items-center justify-between">
                      <p className="text-sm">{source.source}</p>
                      <p className="font-medium">{source.percentage}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Customers"
              value="2,543"
              icon={Users}
              description="Active customers"
              trend={{ value: 15.3, isPositive: true }}
            />
            <StatCard
              title="New Customers"
              value="456"
              icon={Users}
              description="This month"
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatCard
              title="Returning Rate"
              value="65.3%"
              icon={ArrowUpRight}
              description="Repeat customers"
              trend={{ value: 5.2, isPositive: true }}
            />
            <StatCard
              title="Churn Rate"
              value="12.5%"
              icon={ArrowDownRight}
              description="This month"
              trend={{ value: 2.1, isPositive: false }}
            />
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Page Views"
              value="125,432"
              icon={Eye}
              description="This month"
              trend={{ value: 18.2, isPositive: true }}
            />
            <StatCard
              title="Wishlist Adds"
              value="2,345"
              icon={Heart}
              description="This month"
              trend={{ value: 9.3, isPositive: true }}
            />
            <StatCard
              title="Search Volume"
              value="15,432"
              icon={Search}
              description="This month"
              trend={{ value: 12.1, isPositive: true }}
            />
            <StatCard
              title="Bounce Rate"
              value="42.3%"
              icon={ArrowDownRight}
              description="This month"
              trend={{ value: 3.2, isPositive: false }}
            />
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Stock"
              value="12,543"
              icon={Package}
              description="Items in stock"
            />
            <StatCard
              title="Low Stock"
              value="123"
              icon={Package}
              description="Items below threshold"
              trend={{ value: 8.4, isPositive: false }}
            />
            <StatCard
              title="Out of Stock"
              value="45"
              icon={Package}
              description="Items to restock"
              trend={{ value: 12.5, isPositive: false }}
            />
            <StatCard
              title="Stock Value"
              value="$234,567"
              icon={DollarSign}
              description="Total inventory value"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}