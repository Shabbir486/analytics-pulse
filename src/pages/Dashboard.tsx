import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

export function Dashboard() {
  return (
    <div className="container py-6 space-y-6">
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <h1 className="text-3xl font-bold mt-2">Dashboard</h1>
      </div>
      <div className="grid gap-6">
        <p>Dashboard content will go here</p>
      </div>
    </div>
  );
}