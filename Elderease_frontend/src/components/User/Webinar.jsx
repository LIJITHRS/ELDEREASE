import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Webinar = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ Navigate to login if user is not logged in

  useEffect(() => {
    const fetchApprovedWebinars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events/approved'); // ✅ Fetch webinars
        setWebinars(response.data);
      } catch (error) {
        setError("Failed to load webinars.");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedWebinars();
  }, []);

  if (loading) return <p>Loading webinars...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Upcoming Webinars</h1>
      {webinars.length === 0 ? (
        <p className="text-center">No upcoming webinars.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Conducted By</th>
                <th className="py-3 px-6 text-left">Join Webinar</th>
              </tr>
            </thead>
            <tbody>
              {webinars.map((webinar) => (
                <tr key={webinar._id} className="border-b hover:bg-gray-100">
                  <td className="py-4 px-6">{webinar.title || "No Title"}</td>
                  <td className="py-4 px-6">{webinar.date ? new Date(webinar.date).toLocaleString() : "No Date"}</td>
                  <td className="py-4 px-6">
                    {webinar.createdBy?.username 
                      ? `${webinar.createdBy.username} `
                      : "Unknown"}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                      onClick={() => handleAddToCalendar(webinar)}
                    >
                      Add to Google Calendar
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

// 📌 Function to check login and add to Google Calendar
const handleAddToCalendar = (webinar) => {
  const token = localStorage.getItem("token"); // ✅ Check if user is logged in

  if (!token) {
    alert("❌ Please log in to mark this webinar in your calendar.");
    window.location.href = "/login"; // ✅ Redirect to login page
    return;
  }

  const startDate = new Date(webinar.date).toISOString().replace(/-|:|\.\d+/g, '');
  const endDate = new Date(new Date(webinar.date).getTime() + 3600000).toISOString().replace(/-|:|\.\d+/g, ''); // Adds 1 hour

  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    webinar.title
  )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
    webinar.description || "Webinar"
  )}`;

  window.open(googleCalendarUrl, '_blank');
};

export default Webinar;
