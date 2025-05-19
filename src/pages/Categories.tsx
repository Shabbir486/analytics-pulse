
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { CategoriesList } from "@/components/categories/CategoriesList";
import { fetchCategories } from '@/services/categoryService';
import { toast } from "sonner";

export function Categories() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error } = useQuery({
    queryKey: ['categories', page, pageSize],
    queryFn: () => fetchCategories(page, pageSize),
  });

  if (error) {
    toast.error("Failed to fetch categories");
    console.error("Error fetching categories:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/categories">Categories</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>List</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <CategoriesList 
        categories={data?.data.content || []} 
        isLoading={isLoading} 
        pagination={{
          page,
          pageSize,
          totalPages: data?.data.totalPages || 0,
          totalElements: data?.data.totalElements || 0,
          setPage,
          setPageSize
        }}
      />
    </div>
  );
}

export default Categories;
