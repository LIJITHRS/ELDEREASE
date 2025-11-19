import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navigation = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  // ✅ Ensure state updates when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem('userRole'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // ✅ Update state when component mounts (ensures role updates after login)
  useEffect(() => {
    setUserRole(localStorage.getItem('userRole'));
  }, []);

  // Function to log out
  const handleLogout = () => {
    localStorage.clear(); // Remove user data
    setUserRole(null); // Update state to force re-render
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>ElderEase</h1>
      </div>
      <div className="nav-links">
        <NavLink to="/" exact activeClassName="active" className="text-white mx-4">
          Home
        </NavLink>
        <NavLink to="/tutorials" activeClassName="active" className="text-white mx-4">
          Tutorials
        </NavLink>

        {/* ✅ Show "Add Event" only if userRole is "user" (not admin) */}
        {userRole === 'user' && (
          <NavLink to="/add-event" activeClassName="active" className="text-white mx-4">
            Add Event
          </NavLink>
        )}

{userRole === 'admin' && (
        <NavLink to="/events" activeClassName="active" className="text-white mx-4">
          Events
        </NavLink>
        )}
        <NavLink to="/support" activeClassName="active" className="text-white mx-4">
          Support
        </NavLink>
        <NavLink to="/health" activeClassName="active" className="text-white mx-4">
          Health Resources
        </NavLink>
        <NavLink to="/contact-us" activeClassName="active" className="text-white mx-4">
          Contact Us
        </NavLink>

        {/* ✅ Show "Approve Events" only for Admin */}
        {userRole === 'admin' && (
          <NavLink to="/approve-events" activeClassName="active" className="text-white mx-4">
            Approve Events
          </NavLink>
        )}

        {/* Show Login/Logout Button */}
        {userRole ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;