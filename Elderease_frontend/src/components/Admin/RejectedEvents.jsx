import React, { useState, useEffect } from "react";
import axios from "axios";

const RejectedEvents = () => {
    const [rejectedEvents, setRejectedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch rejected events from the backend
    const fetchRejectedEvents = async () => {
        try {
            const response = await axios.get("http://localhost:5000/events/rejected");
            console.log("API Response:", response.data);  // Debugging log

            if (Array.isArray(response.data)) {
                setRejectedEvents(response.data);
            } else {
                throw new Error("Invalid response format: Expected an array");
            }
        } catch (error) {
            console.error("Error fetching rejected events:", error.response?.data || error.message);
            setError("Failed to load rejected events. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRejectedEvents();
    }, []);

    if (loading) return <p>Loading rejected events...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h1 className="text-4xl font-bold text-center mb-6">Rejected Events</h1>
            {rejectedEvents.length === 0 ? (
                <p className="text-center">No rejected events available.</p>
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
                            {rejectedEvents.map((event) => (
                                <tr key={event._id} className="border-b hover:bg-gray-100">
                                    <td className="py-4 px-6">{event.title || "No Title"}</td>
                                    <td className="py-4 px-6">{event.description || "No Description"}</td>
                                    <td className="py-4 px-6">
                                        {event.date ? new Date(event.date).toLocaleString() : "No Date"}
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

export default RejectedEvents;
