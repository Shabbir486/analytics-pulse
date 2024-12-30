import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil } from "lucide-react";
import { useState } from "react";
import { mockCustomers } from "./mockData";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SortConfig, SortDirection, sortData } from "@/utils/sorting";

interface CustomerTableProps {
  selectedTab: string;
  searchQuery: string;
  roleFilter: string;
}

export function CustomerTable({ selectedTab, searchQuery, roleFilter }: CustomerTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isDense, setIsDense] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleSort = (key: string) => {
    let direction: SortDirection = "asc";
    
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    setSortConfig(direction ? { key, direction } : null);
  };

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesTab = selectedTab === "all" || customer.status.toLowerCase() === selectedTab;
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    const matchesRole = roleFilter === "all" || customer.role.toLowerCase() === roleFilter.toLowerCase();

    return matchesTab && matchesSearch && matchesRole;
  });

  const sortedCustomers = sortData(filteredCustomers, sortConfig);
  const totalPages = Math.ceil(sortedCustomers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentCustomers = sortedCustomers.slice(startIndex, endIndex);

  const toggleSelectAll = () => {
    if (selectedCustomers.length === currentCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(currentCustomers.map(c => c.id));
    }
  };

  const toggleSelectCustomer = (customerId: string) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "success";
      case "pending": return "warning";
      case "banned": return "destructive";
      case "rejected": return "secondary";
      default: return "default";
    }
  };

  const renderSortableHeader = (label: string, key: string) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(key)}
      className="h-8 flex items-center gap-1 font-semibold"
    >
      {label}
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">Dense</span>
        <Switch checked={isDense} onCheckedChange={setIsDense} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedCustomers.length === currentCustomers.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>{renderSortableHeader("Name", "name")}</TableHead>
              <TableHead>{renderSortableHeader("Phone number", "phone")}</TableHead>
              <TableHead>{renderSortableHeader("Company", "company")}</TableHead>
              <TableHead>{renderSortableHeader("Role", "role")}</TableHead>
              <TableHead>{renderSortableHeader("Status", "status")}</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCustomers.map((customer) => (
              <TableRow key={customer.id} className={isDense ? "h-12" : "h-16"}>
                <TableCell>
                  <Checkbox 
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={() => toggleSelectCustomer(customer.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <img src={customer.avatar} alt={customer.name} />
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{customer.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {customer.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.company}</TableCell>
                <TableCell>{customer.role}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(customer.status)}>
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page</span>
          <Select
            value={String(rowsPerPage)}
            onValueChange={(value) => {
              setRowsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue>{rowsPerPage}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            {startIndex + 1}-{Math.min(endIndex, sortedCustomers.length)} of {sortedCustomers.length}
          </span>
        </div>
      </div>
    </div>
  );
}