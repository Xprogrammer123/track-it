import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { Add, Edit, Delete, Logout } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = "https://track-it-api.vercel.app/api/admin";

const AdminPage = () => {
  const { state, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });
  const [editUser, setEditUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/accounts`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email) {
      addNotification("Name and Email are required!");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        fetchUsers();
        setNewUser({ name: "", email: "", role: "User" });
        addNotification("User added successfully!");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEditUser = async () => {
    if (!editUser.name || !editUser.email) {
      addNotification("Name and Email are required!");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/accounts/${editUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify(editUser),
      });
      if (response.ok) {
        fetchUsers();
        setEditUser(null);
        addNotification("User updated successfully!");
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/accounts/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${state.token}` },
      });
      if (response.ok) {
        fetchUsers();
        addNotification("User deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const addNotification = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <AppBar position="static" sx={{ width: "100%", mb: 4 }} color="error">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, {state.user?.name || state.user?.username}!
          </Typography>
          <Button color="inherit" startIcon={<Logout />} onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="info" onClose={() => setOpenSnackbar(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Add New User */}
      <Box display="flex" gap={2} mb={4} width="100%">
        <TextField
          label="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          fullWidth
        />
        <TextField
          label="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          fullWidth
        />
        <Button variant="contained" startIcon={<Add />} onClick={handleAddUser}>
          Add User
        </Button>
      </Box>

      {/* Users Table */}
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => setEditUser(user)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={!!editUser} onClose={() => setEditUser(null)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editUser?.name || ""}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            value={editUser?.email || ""}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditUser}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPage;
