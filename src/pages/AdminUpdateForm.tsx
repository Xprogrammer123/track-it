import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const UpdatePackageForm = ({ open, onClose, packageId }: any) => {
  const { state } = useAuth();
  const [formData, setFormData] = useState({
    trackingCode: "",
    destination: "",
    shipper_name: "",
    shipper_address: "",
    receiver_name: "",
    receiver_address: "",
    status: "",
    comment: "",
    days_remaining: "",
    delivery_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch package by ID
  useEffect(() => {
    const fetchPackage = async () => {
      if (!packageId) return;

      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `https://track-it-api.vercel.app/api/admin/package/?packageId=${packageId}`,
          {
            headers: { Authorization: `Bearer ${state.token}` },
          }
        );
        const packageData = response.data.package;
        setFormData({
          ...packageData,
          delivery_date: formatDate(packageData.delivery_date), // Format the date
        });
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching the package.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [packageId, state.token]);

  const formatDate = (isoString: any) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const {
      trackingCode,
      destination,
      shipper_name,
      shipper_address,
      receiver_name,
      receiver_address,
      status,
      comment,
      days_remaining,
      delivery_date,
    } = formData;

    if (
      !trackingCode ||
      !destination ||
      !shipper_name ||
      !shipper_address ||
      !receiver_name ||
      !receiver_address ||
      !status ||
      !comment ||
      !days_remaining ||
      !delivery_date
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Send PUT request to update the package
      await axios.put(
        `https://track-it-api.vercel.app/api/admin/package/${packageId}`,
        {
            ...formData,
            delivery_date: new Date(formData.delivery_date).toISOString(), // Convert to ISO
          },
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      );

      alert("Package updated successfully.");
      onClose();
    } catch (err) {
      console.error(err);
      setError("An error occurred while updating the package.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Package</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <TextField
              label="Shipper Name"
              name="shipper_name"
              value={formData.shipper_name}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Shipper Address"
              name="shipper_address"
              value={formData.shipper_address}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Receiver Name"
              name="receiver_name"
              value={formData.receiver_name}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Receiver Address"
              name="receiver_address"
              value={formData.receiver_address}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              margin="normal"
            />
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
            <TextField
              label="Days Remaining"
              name="days_remaining"
              value={formData.days_remaining}
              onChange={handleChange}
              required
              type="number"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Delivery Date"
              name="delivery_date"
              value={formData.delivery_date}
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
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Update Package"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePackageForm;
