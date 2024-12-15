import React from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Users,
  LogOut,
  Search,
  Eye,
  UserMinus,
  Trash,
  Bell,
} from "lucide-react";

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
  const [notifications, setNotifications] = React.useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const addNotification = (message) => {
    setNotifications((prev) => [...prev, message]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n !== message));
    }, 3000);
  };

  const handleDeactivateAccount = (username) => {
    addNotification(`Account ${username} has been deactivated`);
  };

  const handleDeleteAccount = (username) => {
    addNotification(`Account ${username} has been deleted`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-foreground">
            Welcome, Admin
          </h1>
          <button className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 space-y-8">
        {/* Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-primary text-primary-foreground p-4 rounded-md shadow-lg"
            >
              <Bell className="inline-block mr-2 h-4 w-4" />
              {notification}
            </motion.div>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="flex justify-between items-center">
          <div className="relative w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 border rounded w-full px-3 py-2"
            />
          </div>
          <div className="space-x-4">
            <button className="flex items-center gap-2 border px-4 py-2 rounded">
              <UserPlus className="h-4 w-4" />
              Add New Admin
            </button>
            <button className="flex items-center gap-2 border px-4 py-2 rounded">
              <Users className="h-4 w-4" />
              View All Admins
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-md border">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Username</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Registration Date</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.registrationDate}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 border rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 border rounded"
                        onClick={() => handleDeactivateAccount(user.username)}
                      >
                        <UserMinus className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 bg-red-600 text-white rounded"
                        onClick={() => handleDeleteAccount(user.username)}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-6 mt-8">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Admin Dashboard. Version 1.0.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminPage;
