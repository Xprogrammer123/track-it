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
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        // Add your backend sync logic here
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">Admin Update Form</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
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

                {/* Shipper Information */}
                <div>
                    <h2 className="text-xl font-semibold mt-4">Shipper Information</h2>
                    <div className="mt-2 space-y-4">
                        <div>
                            <label htmlFor="shipperName" className="block font-medium">
                                Name
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
                        <div>
                            <label htmlFor="shipperAddress" className="block font-medium">
                                Address
                            </label>
                            <textarea
                                id="shipperAddress"
                                name="shipperAddress"
                                value={formData.shipperAddress}
                                onChange={handleChange}
                                placeholder="Enter shipper address"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Receiver Information */}
                <div>
                    <h2 className="text-xl font-semibold mt-4">Receiver Information</h2>
                    <div className="mt-2 space-y-4">
                        <div>
                            <label htmlFor="receiverName" className="block font-medium">
                                Name
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
                        <div>
                            <label htmlFor="receiverAddress" className="block font-medium">
                                Address
                            </label>
                            <textarea
                                id="receiverAddress"
                                name="receiverAddress"
                                value={formData.receiverAddress}
                                onChange={handleChange}
                                placeholder="Enter receiver address"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
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

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Update and Sync
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminUpdateForm;
