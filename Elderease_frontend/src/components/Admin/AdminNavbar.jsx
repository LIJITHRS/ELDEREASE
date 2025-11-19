import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // ✅ Clear stored user data
    navigate("/"); // ✅ Redirect to homepage
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div>
        <Link to="/admin-dashboard" className="mx-4">Dashboard</Link>
        <Link to="/events" className="mx-4">Events List</Link>
        <Link to="/approve-events" className="mx-4">Approved Events</Link>
        <Link to="/admin-tutorials" className="mx-4">Tutorilas</Link>
        <Link to="/adminchat" className="mx-4">Admin chat</Link>
        <Link to="/questions" className="mx-4">Questions</Link>
        <Link to="/answers" className="mx-4">Answers</Link>
        <button onClick={handleLogout} className="mx-4 bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
