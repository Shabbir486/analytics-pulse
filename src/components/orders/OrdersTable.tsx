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
import { Switch } from "../ui/switch";

interface OrdersTableProps {
  statusFilter: OrderStatus | "all";
  searchQuery: string;
  dateRange: { from: Date | undefined; to: Date | undefined };
  mockOrders: Order[];
}

export function OrdersTable({
  statusFilter,
  searchQuery,
  dateRange,
  mockOrders,
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
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate =
      !dateRange.from ||
      !dateRange.to ||
      (new Date(order.date) >= dateRange.from &&
        new Date(order.date) <= dateRange.to);

    return matchesStatus && matchesSearch && matchesDate;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "destructive";
      case "refunded":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2">
        <p>Dense</p>
        <Switch checked={isDense} onClick={() => setIsDense(!isDense)}></Switch>
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
                <TableRow key={order.id} className={isDense ? "h-12" : "h-20"}>
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
                        <img
                          src={order.customer.avatar}
                          alt={order.customer.name}
                        />
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
                    <TableCell colSpan={12} className="bg-muted/50 p-2">
                      <div className="space-y-1">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="bg-card rounded-sm shadow-md p-2 flex items-center justify-between"
                          >
                            <div className="w-20 mx-2">
                            <img
                              src={item.image}
                              alt="Urban Explorer Sneakers"
                              className="rounded-lg mr-4 w-16 h-16 object-cover"
                            />
                            </div>
                            <div className=" flex flex-col min-w-10 justify-start w-full">
                              <span className="font-medium">{item.name}</span>
                              <span className="text-sm text-muted-foreground">
                                (SKU: {item.sku})
                              </span>
                            </div>
                            <p className="w-24"> x{item.quantity}</p>
                            <div className=" text-sm text-right w-24">
                              {item.price.toFixed(2)}
                            </div>
                          </div>
                        ))}
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
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
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
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
