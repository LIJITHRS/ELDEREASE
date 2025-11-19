import React, { useState } from "react";

const AddEvent = () => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    link: "",
  });

  const [message, setMessage] = useState(""); // For success/error messages

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
  
    const token = localStorage.getItem("token"); // Get token from local storage
  
    if (!token) {
      setMessage("User not authenticated. Please log in.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // ✅ Send token in request
        },
        body: JSON.stringify(event),
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessage("Event added successfully!");
        setEvent({ title: "", description: "", date: "", link: "" }); // Clear form
      } else {
        setMessage(data.message || "Failed to add event.");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    }
  };
  

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg"
      >
        <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
          Add New Event
        </h1>

        {message && (
          <div
            className={`text-center p-2 mb-4 rounded ${
              message.includes("success") ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Event Title</label>
          <input
            name="title"
            value={event.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter event title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter event description"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Date & Time</label>
          <input
            type="datetime-local"
            name="date"
            value={event.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Event Link</label>
          <input
            name="link"
            value={event.link}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter event link (e.g., Zoom link)"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
