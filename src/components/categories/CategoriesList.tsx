
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, MoreVertical, Search } from "lucide-react";
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
  PaginationEllipsis, 
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

  // Render pagination controls
  const renderPagination = () => {
    const { page, pageSize, totalPages, setPage } = pagination;
    
    // Generate page numbers to display
    const getPageNumbers = () => {
      const pageNumbers = [];
      const maxButtons = 5; // Maximum number of page buttons to show
      
      if (totalPages <= maxButtons) {
        // If total pages are less than max buttons, show all pages
        for (let i = 0; i < totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Always include first page
        pageNumbers.push(0);
        
        // Calculate start and end of page range around current page
        let startPage = Math.max(1, page - 1);
        let endPage = Math.min(totalPages - 2, page + 1);
        
        // Adjust if we're near the beginning
        if (page < 2) {
          endPage = 3;
        }
        
        // Adjust if we're near the end
        if (page > totalPages - 3) {
          startPage = totalPages - 4;
        }
        
        // Add ellipsis after first page if needed
        if (startPage > 1) {
          pageNumbers.push(-1); // Use -1 to represent ellipsis
        }
        
        // Add page numbers around current page
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
        
        // Add ellipsis before last page if needed
        if (endPage < totalPages - 2) {
          pageNumbers.push(-2); // Use -2 to represent ellipsis
        }
        
        // Always include last page
        pageNumbers.push(totalPages - 1);
      }
      
      return pageNumbers;
    };

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => page > 0 && setPage(page - 1)} 
              className={page === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {getPageNumbers().map((pageNum, index) => (
            pageNum >= 0 ? (
              <PaginationItem key={index}>
                <PaginationLink 
                  isActive={page === pageNum}
                  onClick={() => setPage(pageNum)}
                  className="cursor-pointer"
                >
                  {pageNum + 1}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => page < totalPages - 1 && setPage(page + 1)}
              className={page >= totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  // Render page size selector
  const renderPageSizeSelector = () => {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Show</span>
        <Select 
          value={pagination.pageSize.toString()} 
          onValueChange={(value) => pagination.setPageSize(Number(value))}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder={pagination.pageSize.toString()} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">per page</span>
      </div>
    );
  };

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

      <div className="flex items-center justify-between mt-4">
        {renderPageSizeSelector()}
        {pagination.totalPages > 1 && renderPagination()}
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
