import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, MoreVertical, Search, ArrowUpDown } from "lucide-react";
import { Category } from "@/types/category";
import { CategoriesTable } from "./CategoriesTable";
import { CreateCategoryDialog } from "./CreateCategoryDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, toggleCategoryStatus } from "@/services/categoryService";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface CategoriesListProps {
  categories: Category[];
  isLoading: boolean;
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
  };
}

export function CategoriesList({ 
  categories, 
  isLoading, 
  pagination 
}: CategoriesListProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const queryClient = useQueryClient();
  
  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed to delete category: ${error}`);
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) => 
      toggleCategoryStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success("Category status updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update category status: ${error}`);
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleToggleStatus = (id: number, currentStatus: boolean) => {
    toggleStatusMutation.mutate({ id, isActive: !currentStatus });
  };

  // Apply client-side filters only to currently loaded page data
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === "all") return matchesSearch;
    const isActiveFilter = statusFilter === "active";
    return matchesSearch && category.isActive === isActiveFilter;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Category
        </Button>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-1 relative min-w-[200px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <CategoriesTable 
        categories={filteredCategories}
        isLoading={isLoading}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      {/* Updated pagination section to match the Products component */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 w-full">
          <span className="text-sm text-muted-foreground">Rows per page</span>
          <Select
            value={String(pagination.pageSize)}
            onValueChange={(value) => pagination.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue>{pagination.pageSize}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Pagination className="w-full">
          <PaginationContent>
            <PaginationItem className="w-[3.6rem]">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => pagination.setPage(Math.max(0, pagination.page - 1))}
                disabled={pagination.page === 0}
              >
                <PaginationPrevious />
              </Button>
            </PaginationItem>
            {Array.from({ length: pagination.totalPages }, (_, i) => i).map((page) => (
              <PaginationItem key={page}>
                <Button
                  variant={pagination.page === page ? "default" : "ghost"}
                  size="icon"
                  onClick={() => pagination.setPage(page)}
                >
                  {page + 1}
                </Button>
              </PaginationItem>
            ))}
            <PaginationItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => pagination.setPage(Math.min(pagination.totalPages - 1, pagination.page + 1))}
                disabled={pagination.page === pagination.totalPages - 1}
              >
                <PaginationNext className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <span className="text-sm text-muted-foreground w-full text-right">
          Showing {pagination.page * pagination.pageSize + 1}-
          {Math.min((pagination.page + 1) * pagination.pageSize, pagination.totalElements)} of {pagination.totalElements}
        </span>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Showing {Math.min(pagination.pageSize, filteredCategories.length)} of {pagination.totalElements} categories 
        (Page {pagination.page + 1} of {pagination.totalPages})
      </div>

      <CreateCategoryDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
