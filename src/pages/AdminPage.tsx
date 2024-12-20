import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const AdminPage = () => {
    const [data, setData] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track which row is being edited
    const [editableData, setEditableData] = useState({}); // Temporary state for editable fields

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("adminData")) || [];
        setData(savedData);
    }, []);

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditableData({ ...data[index] }); // Load current row data for editing
    };

    const handleSave = (index) => {
        const updatedData = [...data];
        updatedData[index] = { ...data[index], ...editableData }; // Update only editable fields
        setData(updatedData);
        localStorage.setItem("adminData", JSON.stringify(updatedData));
        setEditIndex(null); // Exit edit mode
    };

    const handleCancel = () => {
        setEditIndex(null); // Exit edit mode without saving
    };

    const handleDelete = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
        localStorage.setItem("adminData", JSON.stringify(updatedData));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
            {/* Header */}
            <header className="bg-red-500 text-white text-center py-4 rounded-md mb-6">
                <h1 className="text-3xl font-bold">Welcome Admin</h1>
            </header>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 whitespace-nowrap">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">#</th>
                            <th className="border border-gray-300 p-2">Status</th>
                            <th className="border border-gray-300 p-2">Last Updated</th>
                            <th className="border border-gray-300 p-2">Comment</th>
                            <th className="border border-gray-300 p-2">Tracking Code</th>
                            <th className="border border-gray-300 p-2">Destination</th>
                            <th className="border border-gray-300 p-2">Shipper Name</th>
                            <th className="border border-gray-300 p-2">Shipper Address</th>
                            <th className="border border-gray-300 p-2">Receiver Name</th>
                            <th className="border border-gray-300 p-2">Receiver Address</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 p-2">{index + 1}</td>
                                {editIndex === index ? (
                                    <>
                                        <td className="border border-gray-300 p-2">
                                            <select
                                                name="status"
                                                value={editableData.status}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-md"
                                            >
                                                <option value="processing">Processing</option>
                                                <option value="in-transit">In-Transit</option>
                                                <option value="on-hold">On-Hold</option>
                                                <option value="delivered">Delivered</option>
                                            </select>
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="date"
                                                name="lastUpdated"
                                                value={editableData.lastUpdated}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <textarea
                                                name="comment"
                                                value={editableData.comment}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-md"
                                            ></textarea>
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                name="trackingCode"
                                                value={editableData.trackingCode}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-md"
                                            />
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="border border-gray-300 p-2">{item.status}</td>
                                        <td className="border border-gray-300 p-2">{item.lastUpdated}</td>
                                        <td className="border border-gray-300 p-2">{item.comment}</td>
                                        <td className="border border-gray-300 p-2">{item.trackingCode}</td>
                                    </>
                                )}
                                <td className="border border-gray-300 p-2">{item.destination}</td>
                                <td className="border border-gray-300 p-2">{item.shipperName}</td>
                                <td className="border border-gray-300 p-2">{item.shipperAddress}</td>
                                <td className="border border-gray-300 p-2">{item.receiverName}</td>
                                <td className="border border-gray-300 p-2">{item.receiverAddress}</td>
                                <td className="border border-gray-300 p-2 flex items-center space-x-2">
                                    {editIndex === index ? (
                                        <>
                                            <button
                                                onClick={() => handleSave(index)}
                                                className="text-green-500"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="text-red-500"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleEdit(index)}
                                                className="text-blue-500"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="text-red-500"
                                            >
                                                <FaTrash />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;
