import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const AdminAddTrackingForm = ({ open, onClose }: any) => {
  const { state } = useAuth();
  const [formData, setFormData] = useState({
    trackingCode: "",
    destination: "",
    shipperName: "",
    shipperAddress: "",
    receiverName: "",
    receiverAddress: "",
    status: "",
    comment: "",
    deliveryDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const {
      trackingCode,
      destination,
      shipperName,
      shipperAddress,
      receiverName,
      receiverAddress,
      status,
      comment,
      deliveryDate,
    } = formData;

    // Validate required fields
    if (
      !trackingCode ||
      !destination ||
      !shipperName ||
      !shipperAddress ||
      !receiverName ||
      !receiverAddress ||
      !status ||
      !comment ||
      !deliveryDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    const requestBody = {
      trackingCode,
      destination,
      shipperName,
      shipperAddress,
      receiverName,
      receiverAddress,
      status,
      comment,
      deliveryDate,
    };

    try {
      // Send POST request to add tracking info
      await axios.post(
        "https://track-it-api.vercel.app/api/admin/package",
        requestBody,
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      );

      alert("Tracking information added successfully.");

      // Close the dialog after successful submission
      onClose();

      // Reset form data
      setFormData({
        trackingCode: "",
        destination: "",
        shipperName: "",
        shipperAddress: "",
        receiverName: "",
        receiverAddress: "",
        status: "",
        comment: "",
        deliveryDate: "",
      });
    } catch (err) {
      console.error(err);
      setError("An error occurred while adding tracking information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Tracking Information</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status */}
          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            margin="normal"
          >
            <MenuItem value="Pending">Processing</MenuItem>
            <MenuItem value="In Transit">In Transit</MenuItem>
            <MenuItem value="Delivered">On Hold</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </TextField>

          {/* Tracking Code */}
          <TextField
            label="Tracking Code"
            name="trackingCode"
            value={formData.trackingCode}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            margin="normal"
          />

          {/* Destination */}
          <TextField
            label="Destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            margin="normal"
          />

          {/* Shipper Name */}
          <TextField
            label="Shipper Name"
            name="shipperName"
            value={formData.shipperName}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            margin="normal"
          />

          {/* Shipper Address */}
          <TextField
            label="Shipper Address"
            name="shipperAddress"
            value={formData.shipperAddress}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            margin="normal"
          />

          {/* Receiver Name */}
          <TextField
            label="Receiver Name"
            name="receiverName"
            value={formData.receiverName}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            margin="normal"
          />

          {/* Receiver Address */}
          <TextField
            label="Receiver Address"
            name="receiverAddress"
            value={formData.receiverAddress}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            margin="normal"
          />

          {/* Comment */}
          <TextField
            label="Comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            margin="normal"
          />

          {/* Delivery Date */}
          <TextField
            label="Delivery Date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            required
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            margin="normal"
          />

          {error && <p className="text-red-500 text-center border-red-500 border rounded-md py-2 px-4">{error}</p>}
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error" variant="outlined" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="error"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Add Tracking Info"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminAddTrackingForm;
