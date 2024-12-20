import React, { useState } from "react";

const AdminUpdateForm = () => {
    const [formData, setFormData] = useState({
        status: "processing",
        lastUpdated: "",
        comment: "",
        trackingCode: "",
        destination: "",
        shipperName: "",
        shipperAddress: "",
        receiverName: "",
        receiverAddress: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate required fields
        const { status, lastUpdated, trackingCode, destination } = formData;
        if (!lastUpdated || trackingCode.trim() === "" || destination.trim() === "") {
            alert("Please fill in all required fields.");
            return;
        }

        // Save to localStorage
        const existingData = JSON.parse(localStorage.getItem("adminData")) || [];
        existingData.push(formData);
        localStorage.setItem("adminData", JSON.stringify(existingData));

        alert("Data updated and synced successfully.");
        // Reset the form
        setFormData({
            status: "processing",
            lastUpdated: "",
            comment: "",
            trackingCode: "",
            destination: "",
            shipperName: "",
            shipperAddress: "",
            receiverName: "",
            receiverAddress: "",
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">Admin Update Form</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Status */}
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

                {/* Comment */}
                <div>
                    <label htmlFor="comment" className="block font-medium">
                        Comment
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        placeholder="Add a comment"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        rows="4"
                    ></textarea>
                </div>

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
                    />
                </div>

                {/* Destination */}
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

                {/* Shipper Name */}
                <div>
                    <label htmlFor="shipperName" className="block font-medium">
                        Shipper Name
                    </label>
                    <input
                        type="text"
                        id="shipperName"
                        name="shipperName"
                        value={formData.shipperName}
                        onChange={handleChange}
                        placeholder="Enter shipper name"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Shipper Address */}
                <div>
                    <label htmlFor="shipperAddress" className="block font-medium">
                        Shipper Address
                    </label>
                    <input
                        type="text"
                        id="shipperAddress"
                        name="shipperAddress"
                        value={formData.shipperAddress}
                        onChange={handleChange}
                        placeholder="Enter shipper address"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Receiver Name */}
                <div>
                    <label htmlFor="receiverName" className="block font-medium">
                        Receiver Name
                    </label>
                    <input
                        type="text"
                        id="receiverName"
                        name="receiverName"
                        value={formData.receiverName}
                        onChange={handleChange}
                        placeholder="Enter receiver name"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Receiver Address */}
                <div>
                    <label htmlFor="receiverAddress" className="block font-medium">
                        Receiver Address
                    </label>
                    <input
                        type="text"
                        id="receiverAddress"
                        name="receiverAddress"
                        value={formData.receiverAddress}
                        onChange={handleChange}
                        placeholder="Enter receiver address"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600"
                >
                    Update and Sync
                </button>
            </form>
        </div>
    );
};

export default AdminUpdateForm;
