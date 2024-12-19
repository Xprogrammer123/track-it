import React, { useState } from "react";

const AdminUpdateForm = () => {
  const [formData, setFormData] = useState({
    status: "processing",
    destination: "",
    lastUpdated: "",
    shipperName: "",
    shipperAddress: "",
    receiverName: "",
    receiverAddress: "",
    comment: "",
    trackingCode: "",
  });

  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("adminHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleHistoryChange = (id, fieldName, value) => {
    const updatedHistory = history.map((record) =>
      record.id === id ? { ...record, [fieldName]: value } : record
    );
    setHistory(updatedHistory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = { ...formData, id: Date.now() };
    const updatedHistory = [...history, newRecord];

    setHistory(updatedHistory);
    localStorage.setItem("adminHistory", JSON.stringify(updatedHistory));

    setFormData({
      status: "processing",
      destination: "",
      lastUpdated: "",
      shipperName: "",
      shipperAddress: "",
      receiverName: "",
      receiverAddress: "",
      comment: "",
      trackingCode: "",
    });
  };

  const handleSaveEdit = (id) => {
    setEditingId(null);
    localStorage.setItem("adminHistory", JSON.stringify(history));
  };

  const handleDelete = (id) => {
    const updatedHistory = history.filter((record) => record.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem("adminHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Admin Update Form</h1>
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="status" className="block font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="processing">Processing</option>
              <option value="in-transit">In-Transit</option>
              <option value="on-hold">On-Hold</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <div>
            <label htmlFor="destination" className="block font-medium">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Enter destination"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
        <div>
          <label htmlFor="lastUpdated" className="block font-medium">
            Last Updated
          </label>
          <input
            type="date"
            id="lastUpdated"
            name="lastUpdated"
            value={formData.lastUpdated}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="trackingCode" className="block font-medium">
            Tracking Code
          </label>
          <input
            type="text"
            id="trackingCode"
            name="trackingCode"
            value={formData.trackingCode}
            onChange={handleChange}
            placeholder="Enter tracking code"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </form>

      {/* History Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">History</h2>
        {history.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Tracking Code</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Destination</th>
                <th className="px-4 py-2 border">Last Updated</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record) => (
                <tr key={record.id}>
                  <td className="px-4 py-2 border">
                    {editingId === record.id ? (
                      <input
                        type="text"
                        value={record.trackingCode}
                        onChange={(e) =>
                          handleHistoryChange(record.id, "trackingCode", e.target.value)
                        }
                        className="border border-gray-300 rounded-md p-1 w-full"
                      />
                    ) : (
                      record.trackingCode
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editingId === record.id ? (
                      <select
                        value={record.status}
                        onChange={(e) =>
                          handleHistoryChange(record.id, "status", e.target.value)
                        }
                        className="border border-gray-300 rounded-md p-1 w-full"
                      >
                        <option value="processing">Processing</option>
                        <option value="in-transit">In-Transit</option>
                        <option value="on-hold">On-Hold</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    ) : (
                      record.status
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editingId === record.id ? (
                      <input
                        type="text"
                        value={record.destination}
                        onChange={(e) =>
                          handleHistoryChange(record.id, "destination", e.target.value)
                        }
                        className="border border-gray-300 rounded-md p-1 w-full"
                      />
                    ) : (
                      record.destination
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editingId === record.id ? (
                      <input
                        type="date"
                        value={record.lastUpdated}
                        onChange={(e) =>
                          handleHistoryChange(record.id, "lastUpdated", e.target.value)
                        }
                        className="border border-gray-300 rounded-md p-1 w-full"
                      />
                    ) : (
                      record.lastUpdated
                    )}
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    {editingId === record.id ? (
                      <button
                        onClick={() => handleSaveEdit(record.id)}
                        className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingId(record.id)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUpdateForm;
