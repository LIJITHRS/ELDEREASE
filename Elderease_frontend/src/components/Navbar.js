import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  // ✅ Ensure state updates when localStorage changes
  useEffect(() => {
    const updateRole = () => {
      setUserRole(localStorage.getItem('userRole'));
    };
  
    updateRole(); // initial check
  
    // Listen for custom 'userRoleChanged' event
    window.addEventListener('userRoleChanged', updateRole);
  
    // Cleanup
    return () => {
      window.removeEventListener('userRoleChanged', updateRole);
    };
  }, []);
  

  // ✅ Update state when component mounts (ensures role updates after login)
  useEffect(() => {
    setUserRole(localStorage.getItem('userRole'));
  }, []);

  // Function to log out
  const handleLogout = () => {
    localStorage.clear(); // Remove user data
    setUserRole(null); // Update state to force re-render
    navigate('/'); // Redirect to login page
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
        
          <NavLink to="/add-event" activeClassName="active" className="text-white mx-4">
            Add Event
          </NavLink>
        

        {userRole === 'admin' && (
          <NavLink to="/events" activeClassName="active" className="text-white mx-4">
            Events
          </NavLink>
        )}


        <NavLink to="/health" activeClassName="active" className="text-white mx-4">
          Health Resources
        </NavLink>
        {/* <NavLink to="/contact-us" activeClassName="active" className="text-white mx-4">
          Contact Us
        </NavLink> */}

        {/* ✅ New "Webinars" link (visible to all users) */}
        <NavLink to="/user-webinar" activeClassName="active" className="text-white mx-4">
          Webinars
        </NavLink>

        {/* ✅ Show "Approve Events" only for Admin */}
        {userRole === 'admin' && (
          <NavLink to="/approve-events" activeClassName="active" className="text-white mx-4">
            Approve Events
          </NavLink>
        )}
        <NavLink to="/articles" activeClassName="active" className="text-white mx-4">
            Articles
          </NavLink>  
          <NavLink to="/dailyquiz" activeClassName="active" className="text-white mx-4">
            Dailyquiz
          </NavLink>  
          <NavLink to="/groupchat" activeClassName="active" className="text-white mx-4">
          Groupchat
          </NavLink> 
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

export default Navbar;
