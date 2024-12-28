import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Order, OrderStatus } from "@/types/order";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

// Generate 20 mock orders
const generateMockOrders = (): Order[] => {
  const statuses: OrderStatus[] = ['pending', 'completed', 'cancelled', 'refunded'];
  const orders: Order[] = [];
  
  for (let i = 1; i <= 20; i++) {
    orders.push({
      id: `#${String(i).padStart(5, '0')}`,
      customer: {
        name: `Customer ${i}`,
        email: `customer${i}@example.com`,
        avatar: "/lovable-uploads/0abfa0b3-7f64-4661-a4d4-52cf395f1d90.png"
      },
      date: new Date(2024, 0, i).toISOString(),
      items: [
        {
          id: `item-${i}-1`,
          name: "Product A",
          quantity: Math.floor(Math.random() * 3) + 1,
          price: 79.99,
          sku: "SKU001"
        },
        {
          id: `item-${i}-2`,
          name: "Product B",
          quantity: Math.floor(Math.random() * 2) + 1,
          price: 129.99,
          sku: "SKU002"
        }
      ],
      totalPrice: 299.97,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  
  return orders;
};

const mockOrders = generateMockOrders();

interface OrdersTableProps {
  statusFilter: OrderStatus | 'all';
  searchQuery: string;
  dateRange: { from: Date | undefined; to: Date | undefined };
}

export function OrdersTable({
  statusFilter,
  searchQuery,
  dateRange,
}: OrdersTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDense, setIsDense] = useState(false);
  
  const toggleRow = (orderId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(orderId)) {
      newExpandedRows.delete(orderId);
    } else {
      newExpandedRows.add(orderId);
    }
    setExpandedRows(newExpandedRows);
  };
  
  // Filter orders based on status, search query, and date range
  const filteredOrders = mockOrders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = 
      !dateRange.from || !dateRange.to ||
      (new Date(order.date) >= dateRange.from && new Date(order.date) <= dateRange.to);
    
    return matchesStatus && matchesSearch && matchesDate;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);
  
  const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'destructive';
      case 'refunded':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsDense(!isDense)}
        >
          {isDense ? "Regular view" : "Dense view"}
        </Button>
      </div>
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <>
                <TableRow
                  key={order.id}
                  className={isDense ? "h-12" : ""}
                >
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRow(order.id)}
                    >
                      {expandedRows.has(order.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <img src={order.customer.avatar} alt={order.customer.name} />
                      </Avatar>
                      <div className="flex flex-col">
                        <span>{order.customer.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {order.customer.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.items.length}</TableCell>
                  <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
                {expandedRows.has(order.id) && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="p-4 bg-muted/50">
                        <h4 className="font-medium mb-2">Order Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex justify-between items-center"
                            >
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-sm text-muted-foreground ml-2">
                                  (SKU: {item.sku})
                                </span>
                              </div>
                              <div className="text-sm">
                                {item.quantity} x ${item.price.toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
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
        </div>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}