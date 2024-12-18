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
        trackingCode: "", // Add tracking code to state
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);

        // Save tracking code to localStorage
        if (formData.trackingCode) {
            localStorage.setItem("trackingCode", formData.trackingCode);
            alert("Tracking code saved successfully!");
        } else {
            alert("Please enter a tracking code!");
        }

        // Add backend sync logic here if necessary
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">Admin Update Form</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tracking Code */}
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
                        required
                    />
                </div>

                {/* Status and Destination */}
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

                {/* Last Updated */}
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

                {/* Shipper and Receiver Information */}
                {/* ... (rest of your fields remain unchanged) */}

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600"
                    >
                        Update and Sync
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminUpdateForm;
