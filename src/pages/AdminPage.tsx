import { useState, useEffect } from "react";
import { Trash2, Edit3 } from "lucide-react";
import Footer from "../components/Layout/Footer.tsx";
import AdminAddTrackingForm from "./AdminInput.tsx";
import UpdatePackageForm from "./AdminUpdateForm.tsx";
import Header from "../components/Layout/Header.tsx";
import axios from "axios";
import { useAuth } from "../context/AuthContext.tsx";
import { format } from "date-fns";

const AdminPage = () => {
  const { state, logout } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const updateFormOpen = (packageId: string) => {
    setSelectedPackage(packageId); // Set the selected package ID
    setOpenUpdateForm(true); // Open the update form
  };
  const updateFormClose = () => setOpenUpdateForm(false);

  // Fetch all packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          "https://track-it-api.vercel.app/api/admin/packages",
          {
            headers: { Authorization: `Bearer ${state.token}` },
          }
        );
        console.log("API Response:", response.data);
        setData(response.data.packages); // Adjust based on API structure
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, [state.token]);

  // Fetch package details when selectedPackage changes
  useEffect(() => {
    const fetchPackageDetails = async (packageId: string) => {
      try {
        const response = await axios.get(
          `https://track-it-api.vercel.app/api/admin/package?packageId=${packageId}`,
          {
            headers: { Authorization: `Bearer ${state.token}` },
          }
        );
        console.log("Package Details:", response.data);
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    if (selectedPackage) {
      fetchPackageDetails(selectedPackage);
    }
  }, [selectedPackage, state.token]);

  const handleDelete = (index: any) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    localStorage.setItem("adminData", JSON.stringify(updatedData));
  };

  return (
    <div className="flex flex-col min-h-screen">
       <Header/>
      <div className="flex-grow">
        {/* Header */}
       
        <header className="bg-red-500 text-white text-center py-4 rounded-md mb-6 mt-24">
          <h1 className="text-3xl font-bold">Welcome Admin</h1> 
          <button onClick={()=> logout()}>Logout</button>
        </header>

        {/* Table */}
        <div className="overflow-x-auto max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
          <table className="w-full border-collapse border border-gray-300 whitespace-nowrap">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-4">#</th>
                <th className="border border-gray-300 px-2 py-4">Status</th>
                <th className="border border-gray-300 px-2 py-4">
                  Last Updated
                </th>
                <th className="border border-gray-300 px-2 py-4">Comment</th>
                <th className="border border-gray-300 px-2 py-4">
                  Tracking Code
                </th>
                <th className="border border-gray-300 px-2 py-4">
                  Destination
                </th>
                <th className="border border-gray-300 px-2 py-4">
                  Shipper Name
                </th>
                <th className="border border-gray-300 px-2 py-4">
                  Shipper Address
                </th>
                <th className="border border-gray-300 px-2 py-4">
                  Receiver Name
                </th>
                <th className="border border-gray-300 px-2 py-4">
                  Receiver Address
                </th>
                <th className="border border-gray-300 px-2 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 px-2 py-4">
                    {item.status}
                  </td>
                  <td className="border border-gray-300 px-2 py-4">
                    {format(new Date(item.last_updated), "do MMMM yyyy, h:mm a")}
                  </td>
                  <td className="border border-gray-300 px-2 py-4">
                    {item.comment}
                  </td>
                  <td className="border border-gray-300 px-2 py-4">
                    {item.tracking_code}
                  </td>
                  <td className="border border-gray-300 px-2 py-4">
                    {item.destination}
                  </td>
                  <td className="border border-gray-300 px-2 py-4">
                    {item.shipper_name}
                  </td>
                  <td className="border border-gray-300 px-2 py-4">
                    {item.shipper_address}
                  </td>
                  <td className="border border-gray-300 px-2 py-4">
                    {item.receiver_name}
                  </td>
                  <td className="border border-gray-300 px-2 py-4">
                    {item.receiver_address}
                  </td>
                  <td className="border border-gray-300 px-2 py-4 flex items-center space-x-2">
                    <button
                      title="Edit package info"
                      onClick={() => updateFormOpen(item.id)}
                      className="text-blue-500"
                    >
                      <Edit3 />
                    </button>
                    <UpdatePackageForm
                      open={openUpdateForm}
                      onClose={updateFormClose}
                      packageId={selectedPackage}
                    />
                    <button
                      title="Delete package info"
                      onClick={() => handleDelete(index)}
                      className="text-red-500"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 mb-14 justify-center items-center">
          <button
            className="w-auto h-auto px-4 py-2 border border-red-500 rounded-md text-red-500 bg-white hover:bg-red-500 hover:text-white transition-all duration-200"
            onClick={handleDialogOpen}
          >
            Add Tracking Info
          </button>

          <AdminAddTrackingForm open={openDialog} onClose={handleDialogClose} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
