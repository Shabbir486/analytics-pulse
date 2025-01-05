import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil } from "lucide-react";
import { useState } from "react";
import { mockUsers } from "./mockData";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SortConfig, SortDirection, sortData } from "@/utils/sorting";
import { EditUserDialog } from "./EditUserDialog";
import { User } from "@/types/user";

interface UserTableProps {
  selectedTab: string;
  searchQuery: string;
  roleFilter: string;
}

export function UserTable({ selectedTab, searchQuery, roleFilter }: UserTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isDense, setIsDense] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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

  const filteredUsers = mockUsers.filter((user) => {
    const matchesTab = selectedTab === "all" || user.status.toLowerCase() === selectedTab;
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase();

    return matchesTab && matchesSearch && matchesRole;
  });

  const sortedUsers = sortData(filteredUsers, sortConfig);
  const totalPages = Math.ceil(sortedUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentUsers = sortedUsers.slice(startIndex, endIndex);

  const toggleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentUsers.map(c => c.id));
    }
  };

  const toggleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
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
                  checked={selectedUsers.length === currentUsers.length}
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
            {currentUsers.map((user) => (
              <TableRow key={user.id} className={isDense ? "h-12" : "h-16"}>
                <TableCell>
                  <Checkbox 
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => toggleSelectUser(user.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <img src={user.avatar} alt={user.name} />
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <button 
                        className="text-sm text-muted-foreground text-left hover:text-primary"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        {user.email}
                      </button>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.company}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsEditDialogOpen(true);
                    }}
                  >
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
            {startIndex + 1}-{Math.min(endIndex, sortedUsers.length)} of {sortedUsers.length}
          </span>
        </div>
      </div>

      <EditUserDialog 
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        user={selectedUser}
      />
    </div>
  );
}
