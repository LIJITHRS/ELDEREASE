import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch only pending events
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events');

      if (Array.isArray(response.data)) {
        // ❌ Remove already approved or rejected events
        setEvents(response.data.filter(event => !event.approved && !event.rejected));
      } else if (Array.isArray(response.data.events)) {
        setEvents(response.data.events.filter(event => !event.approved && !event.rejected));
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Approve an event and remove it from the list
  const handleApprove = async (eventId) => {
    try {
      await axios.put(`http://localhost:5000/events/approve/${eventId}`);
      alert("Event approved successfully!");

      // 🔄 Remove approved event from the list
      setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
    } catch (error) {
      console.error("Approval error:", error.response?.data || error.message);
      alert("Failed to approve event. Please try again.");
    }
  };

  // Reject an event and remove it from the list
  const handleReject = async (eventId) => {
    try {
      await axios.put(`http://localhost:5000/events/reject/${eventId}`);
      alert("Event rejected successfully!");

      // 🔄 Remove rejected event from the list
      setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
    } catch (error) {
      console.error("Rejection error:", error.response?.data || error.message);
      alert("Failed to reject event. Please try again.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Manage Events</h1>
      {events.length === 0 ? (
        <p className="text-center">No pending events available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Added By</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="border-b hover:bg-gray-100">
                  <td className="py-4 px-6">{event.title || "No Title"}</td>
                  <td className="py-4 px-6">{event.description || "No Description"}</td>
                  <td className="py-4 px-6">{event.date ? new Date(event.date).toLocaleString() : "No Date"}</td>
                  <td className="py-4 px-6">
                    {event.createdBy?.username || "Unknown User"} ({event.createdBy?.email || "No Email"})
                  </td>
                  <td className="py-4 px-6 flex justify-center space-x-2">
                    <button
                      className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
                      onClick={() => handleApprove(event._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                      onClick={() => handleReject(event._id)}
                    >
                      Reject
                    </button>
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

export default EventList;
