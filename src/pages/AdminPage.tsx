import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
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
  Grid,
  Box,
  Alert,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import { Search, Logout, PersonAdd, Add, Group, Delete } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = "https://track-it-api.vercel.app/api/admin";

const AdminPage = () => {
  const { state, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]); // Track admins separately
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    newUsersThisMonth: 0,
    activeUsers: 0,
  });
  const [viewAllAdmins, setViewAllAdmins] = useState(false); // Toggle between view modes
  const [openDialog, setOpenDialog] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    country: "",
    password: "",
  });
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch users and analytics data
  useEffect(() => {
    fetchUsers();
    fetchAnalytics();
    fetchAdmins();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/accounts`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/accounts`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      setAnalytics({
        totalUsers: response.data.length,
        newUsersThisMonth: response.data.filter(
          (u) =>
            new Date(u.registrationDate).getMonth() === new Date().getMonth()
        ).length,
        activeUsers: response.data.filter((u) =>
          u.packages.some((pkg) => pkg.status === "Active")
        ).length,
      });
    } catch (error) {
      console.error("Error fetching analytics", error);
    }
  };

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admins`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      setAdmins(response.data);
    } catch (err) {
      console.error("Error fetching admins", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleLogout = () => logout();

  const handleSendMessage = async () => {
    addNotification("No Packages yet");
  };

  const handleDeleteAccount = async (userId) => {
    try {
      await axios.delete(`${API_BASE_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      fetchUsers();
      addNotification("Account deleted successfully.");
    } catch (error) {
      console.error("Error deleting account", error);
    }
  };

  const handleAddAdmin = async () => {
    try {
      await axios.post(`${API_BASE_URL}/admin`, newAdmin, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      setOpenDialog(false);
      fetchUsers();
      addNotification("New admin added successfully.");
    } catch (error) {
      console.error("Error adding new admin", error);
    }
  };

  const addNotification = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewAdmin({ name: "", email: "", country: "", password: "" });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleView = () => {
    setViewAllAdmins(!viewAllAdmins);
  };

  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
      }}
      
    >
      {/* Header */}
      <AppBar position="static" sx={{ width: "100%", mb: 4 }} color="error">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, {state.user?.name || state.user?.username}!
          </Typography>
          <Button color="inherit" startIcon={<Logout />} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Notifications Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="info" onClose={() => setOpenSnackbar(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Search and Actions */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        sx={{ width: "100%" }}
      >
        <TextField
          label="Search users"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
        />
        <Box>
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={() => setOpenDialog(true)}
            sx={{ mr: 2 }}
            color="error"
          >
            Add New Admin
          </Button>
          <Button variant="outlined" startIcon={<Group />} onClick={toggleView} color="error">
            {viewAllAdmins ? "View All Users" : "View All Admins"}
          </Button>
        </Box>
      </Box>

      {/* Users Table */}
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {(viewAllAdmins ? admins : users)
                .filter(
                  (user) =>
                    user.name
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    user.email
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {new Date(user.registrationDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        sx={{
                          px: 2,
                          py: 1,
                          borderRadius: "4px",
                          color: user.role === "admin" ? "green" : "red",
                          backgroundColor:
                            user.role === "admin" ? "#e8f5e9" : "#ffebee",
                        }}
                      >
                        {user.role === "admin" ? "Admin" : "User"}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Link to="/input">
                      <IconButton color="success">
                        <Add onClick={() => handleSendMessage()} />
                      </IconButton>
                      </Link>
                      <IconButton color="error">
                        <Delete onClick={() => handleDeleteAccount(user.id)} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      
      {/*admin history button */}
         <Link 
           to ="/adhistory"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
            History
        </button>

      
      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={viewAllAdmins ? admins.length : users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Dashboard Analytics */}
      <Grid container spacing={2} my={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{analytics.totalUsers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">New Users This Month</Typography>
            <Typography variant="h4">{analytics.newUsersThisMonth}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Active Users</Typography>
            <Typography variant="h4">{analytics.activeUsers}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Admin Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Admin</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newAdmin.email}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, email: e.target.value })
            }
          />
          <TextField
            label="Country"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newAdmin.country}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, country: e.target.value })
            }
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newAdmin.password}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, password: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined" color="error">Cancel</Button>
          <Button onClick={handleAddAdmin} variant="contained" color="error">
            Add Admin
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPage;
