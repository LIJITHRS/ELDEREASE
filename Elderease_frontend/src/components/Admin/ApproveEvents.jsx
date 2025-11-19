import React, { useState, useEffect } from "react";
import axios from "axios";

const ApprovedEvents = () => {
    const [approvedEvents, setApprovedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch approved events from the backend
    const fetchApprovedEvents = async () => {
        try {
            const response = await axios.get("http://localhost:5000/events/approved");
            console.log("API Response:", response.data);  // Debugging log

            if (Array.isArray(response.data)) {
                setApprovedEvents(response.data);
            } else {
                throw new Error("Invalid response format: Expected an array");
            }
        } catch (error) {
            console.error("Error fetching approved events:", error.response?.data || error.message);
            setError("Failed to load approved events. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApprovedEvents();
    }, []);

    if (loading) return <p>Loading approved events...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h1 className="text-4xl font-bold text-center mb-6">Approved Events</h1>
            {approvedEvents.length === 0 ? (
                <p className="text-center">No approved events available.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="py-3 px-6 text-left">Title</th>
                                <th className="py-3 px-6 text-left">Description</th>
                                <th className="py-3 px-6 text-left">Date</th>
                                <th className="py-3 px-6 text-left">Added By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {approvedEvents.map((event) => (
                                <tr key={event._id} className="border-b hover:bg-gray-100">
                                    <td className="py-4 px-6">{event.title || "No Title"}</td>
                                    <td className="py-4 px-6">{event.description || "No Description"}</td>
                                    <td className="py-4 px-6">
                                        {event.date ? new Date(event.date).toLocaleDateString() : "No Date"}
                                    </td>
                                    <td className="py-4 px-6">
                                        {event.createdBy?.username || "Unknown User"} ({event.createdBy?.email || "No Email"})
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApprovedEvents;
