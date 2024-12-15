import React from "react";
import { Button } from "../../components/Ui/button";
import { Input } from "../../components/Ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/Ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/Ui/dialog";
import { UserPlus, Users, LogOut, Search, Eye, UserMinus, Trash, Bell } from "lucide-react";

// Mock data for demonstration
const mockUsers = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    registrationDate: "2024-01-15",
    status: "Active",
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
    registrationDate: "2024-02-01",
    status: "Disabled",
  },
];

const AdminPage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [notifications, setNotifications] = React.useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    // Remove notification after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n !== message));
    }, 3000);
  };

  const handleDeactivateAccount = (username: string) => {
    addNotification(`Account ${username} has been deactivated`);
  };

  const handleDeleteAccount = (username: string) => {
    addNotification(`Account ${username} has been deleted`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-foreground">Welcome, Admin</h1>
          <Button variant="secondary" className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 space-y-8">
        {/* Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-primary text-primary-foreground p-4 rounded-md shadow-lg animate-fade-in"
            >
              <Bell className="inline-block mr-2 h-4 w-4" />
              {notification}
            </div>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="flex justify-between items-center">
          <div className="relative w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <div className="space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add New Admin
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Admin</DialogTitle>
                  <DialogDescription>
                    Create a new admin account by filling out the form below.
                  </DialogDescription>
                </DialogHeader>
                {/* Add New Admin Form */}
                <div className="space-y-4 py-4">
                  <Input placeholder="Username" />
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Password" type="password" />
                  <Button className="w-full">Create Admin Account</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="gap-2">
              <Users className="h-4 w-4" />
              View All Admins
            </Button>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.registrationDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>User Profile</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Registration Date:</strong> {user.registrationDate}</p>
                            <p><strong>Status:</strong> {user.status}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeactivateAccount(user.username)}
                      >
                        <UserMinus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteAccount(user.username)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Dashboard Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold">256</p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">New Users This Month</h3>
            <p className="text-3xl font-bold">24</p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Active Users</h3>
            <p className="text-3xl font-bold">180</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-6 mt-8">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <Button variant="link">Contact Support</Button>
            <Button variant="link">Help Center</Button>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Admin Dashboard. Version 1.0.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminPage;
